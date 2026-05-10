#!/usr/bin/env python3
"""
Script to analyze images used in RNJ website and compare with Cloudinary assets
"""

import os
import re
import json
import requests
from pathlib import Path
from urllib.parse import urlparse

def extract_cloudinary_urls_from_file(file_path):
    """Extract all Cloudinary URLs from a file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Pattern to match Cloudinary URLs
        pattern = r'https://res\.cloudinary\.com/dmrtdo9z3/image/upload/[^"\'\s)]+'
        urls = re.findall(pattern, content)
        return list(set(urls))  # Remove duplicates
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return []

def extract_local_image_paths(file_path):
    """Extract local image paths from files"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Pattern to match local image paths in src attributes
        patterns = [
            r'src=["\']([^"\']+\.(?:jpg|jpeg|png|svg|webp))["\']',
            r'["\']([^"\']+\.(?:jpg|jpeg|png|svg|webp))["\']',
        ]
        
        all_paths = []
        for pattern in patterns:
            matches = re.findall(pattern, content, re.IGNORECASE)
            all_paths.extend(matches)
        
        # Filter out external URLs and keep only local paths
        local_paths = []
        for path in all_paths:
            if not path.startswith(('http://', 'https://', '//')):
                local_paths.append(path)
        
        return list(set(local_paths))
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return []

def get_cloudinary_assets():
    """Get all assets from Cloudinary account"""
    api_key = "699751417834341"
    api_secret = "iljP8SEJRK9Jr5Mh9LRxX9Eg9sQ"
    cloud_name = "dmrtdo9z3"
    
    assets = []
    next_cursor = None
    
    while True:
        url = f"https://api.cloudinary.com/v1_1/{cloud_name}/resources/image"
        params = {
            "max_results": 100
        }
        if next_cursor:
            params["next_cursor"] = next_cursor
            
        try:
            response = requests.get(url, params=params, auth=(api_key, api_secret))
            response.raise_for_status()
            data = response.json()
            
            all_resources = data.get('resources', [])
            # Filter only RNJ assets
            rnj_assets = [r for r in all_resources if 'rnj' in r.get('public_id', '')]
            assets.extend(rnj_assets)
            
            if not data.get('next_cursor'):
                break
            next_cursor = data['next_cursor']
            
        except Exception as e:
            print(f"Error fetching Cloudinary assets: {e}")
            break
    
    return assets

def main():
    project_root = Path("/var/www/rnj")
    
    print("🔍 Analyzing RNJ Website Images...")
    print("=" * 50)
    
    # 1. Find all source files
    source_files = []
    for pattern in ["**/*.tsx", "**/*.ts", "**/*.js", "**/*.jsx"]:
        source_files.extend(project_root.glob(pattern))
    
    # Filter out node_modules and .next
    source_files = [f for f in source_files if not any(skip in str(f) for skip in ['node_modules', '.next', '.git'])]
    
    print(f"📁 Found {len(source_files)} source files")
    
    # 2. Extract all Cloudinary URLs used in the code
    all_cloudinary_urls = set()
    all_local_paths = set()
    
    for file_path in source_files:
        urls = extract_cloudinary_urls_from_file(file_path)
        paths = extract_local_image_paths(file_path)
        
        if urls:
            all_cloudinary_urls.update(urls)
            print(f"📸 {file_path.name}: {len(urls)} Cloudinary URLs")
        
        if paths:
            all_local_paths.update(paths)
            print(f"🖼️  {file_path.name}: {len(paths)} local image paths")
    
    print(f"\n🌐 Total unique Cloudinary URLs found: {len(all_cloudinary_urls)}")
    print(f"📂 Total unique local image paths: {len(all_local_paths)}")
    
    # 3. Get all Cloudinary assets
    print("\n☁️  Fetching Cloudinary assets...")
    cloudinary_assets = get_cloudinary_assets()
    print(f"📦 Total Cloudinary assets: {len(cloudinary_assets)}")
    
    # 4. Extract public IDs from used URLs
    used_public_ids = set()
    for url in all_cloudinary_urls:
        # Extract public ID from URL
        # URL format: https://res.cloudinary.com/dmrtdo9z3/image/upload/vVERSION/PUBLIC_ID
        match = re.search(r'/upload/v[^/]+/(.+)', url)
        if match:
            public_id = match.group(1)
            used_public_ids.add(public_id)
    
    # 5. Find unused assets
    asset_public_ids = set(asset['public_id'] for asset in cloudinary_assets)
    unused_public_ids = asset_public_ids - used_public_ids
    
    print(f"\n📊 Analysis Results:")
    print(f"   Used Cloudinary assets: {len(used_public_ids)}")
    print(f"   Total Cloudinary assets: {len(asset_public_ids)}")
    print(f"   Unused assets: {len(unused_public_ids)}")
    
    # 6. Calculate storage savings
    unused_size = 0
    unused_assets_details = []
    
    for asset in cloudinary_assets:
        if asset['public_id'] in unused_public_ids:
            unused_size += asset.get('bytes', 0)
            unused_assets_details.append({
                'public_id': asset['public_id'],
                'format': asset.get('format', 'unknown'),
                'bytes': asset.get('bytes', 0),
                'created_at': asset.get('created_at', 'unknown')
            })
    
    print(f"\n💰 Storage Analysis:")
    print(f"   Unused assets size: {unused_size:,} bytes ({unused_size / 1024 / 1024:.2f} MB)")
    
    # 7. Generate cleanup script
    if unused_assets_details:
        print(f"\n🗑️  Unused assets to delete:")
        for asset in sorted(unused_assets_details, key=lambda x: x['bytes'], reverse=True):
            print(f"   {asset['public_id']}: {asset['format']} ({asset['bytes']:,} bytes)")
        
        # Generate cleanup script
        cleanup_script = "#!/bin/bash\n"
        cleanup_script += "# Cloudinary cleanup script - UNUSED ASSETS\n"
        cleanup_script += "# Run this script to delete unused images from Cloudinary\n\n"
        
        for asset in unused_assets_details:
            cleanup_script += f'echo "Deleting {asset["public_id"]}..."\n'
            cleanup_script += f'curl -X DELETE "https://api.cloudinary.com/v1_1/dmrtdo9z3/resources/image/upload" -u "699751417834341:iljP8SEJRK9Jr5Mh9LRxX9Eg9sQ" -d "public_id={asset["public_id"]}"\n'
            cleanup_script += '\n'
        
        with open(project_root / "cleanup_unused_cloudinary.sh", "w") as f:
            f.write(cleanup_script)
        
        print(f"\n📝 Cleanup script generated: cleanup_unused_cloudinary.sh")
        print(f"   Review the script before running: chmod +x cleanup_unused_cloudinary.sh && ./cleanup_unused_cloudinary.sh")
    
    # 8. Save detailed report
    report = {
        'analysis_date': '2026-05-10',
        'summary': {
            'total_cloudinary_urls': len(all_cloudinary_urls),
            'total_local_paths': len(all_local_paths),
            'total_cloudinary_assets': len(cloudinary_assets),
            'used_assets': len(used_public_ids),
            'unused_assets': len(unused_public_ids),
            'unused_size_bytes': unused_size,
            'unused_size_mb': round(unused_size / 1024 / 1024, 2)
        },
        'used_cloudinary_urls': list(all_cloudinary_urls),
        'local_image_paths': list(all_local_paths),
        'unused_assets': unused_assets_details
    }
    
    with open(project_root / "image_analysis_report.json", "w") as f:
        json.dump(report, f, indent=2)
    
    print(f"\n📄 Detailed report saved: image_analysis_report.json")
    
    # 9. Check for large failed uploads
    print(f"\n⚠️  Checking for large local files that failed to upload...")
    public_optimized = project_root / "public" / "optimized"
    if public_optimized.exists():
        large_files = []
        for file_path in public_optimized.glob("*"):
            if file_path.is_file() and file_path.stat().st_size > 10 * 1024 * 1024:  # > 10MB
                large_files.append({
                    'name': file_path.name,
                    'size_bytes': file_path.stat().st_size,
                    'size_mb': round(file_path.stat().st_size / 1024 / 1024, 2)
                })
        
        if large_files:
            print(f"   Found {len(large_files)} large files (>10MB) that may have failed upload:")
            for file_info in sorted(large_files, key=lambda x: x['size_bytes'], reverse=True):
                print(f"   {file_info['name']}: {file_info['size_mb']} MB")
        else:
            print("   No large files found in public/optimized")

if __name__ == "__main__":
    main()

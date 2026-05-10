#!/bin/bash
# Cloudinary cleanup script - UNUSED ASSETS (Fixed)
# Run this script to delete unused images from Cloudinary
# Uses correct API parameter format: public_ids[] instead of public_id

echo "Starting cleanup of unused Cloudinary assets..."

# List of unused assets to delete
unused_assets=(
    "rnj/optimized/mask-group-43-a1d5b8c4"
    "rnj/optimized/partenariats-public-priv-concessions-image-c255db89"
    "rnj/optimized/mask-group-40-37d12ade"
    "rnj/optimized/whatsapp-image-2026-04-19-12-51-04-pm"
    "rnj/optimized/image-droit-des-contrats-securite-commerciale-1"
    "rnj/optimized/beautiful-forest-against-the-green-field-at-sunset-2026-03-18-07-47-34-utc-0151df33"
    "rnj/optimized/profile-autre-07e379c1"
    "rnj/optimized/profile-institution-b9c718be"
    "rnj/optimized/profile-investisseur-7de68e69"
    "rnj/optimized/profile-entrepreneur-bbe709fa"
    "rnj/optimized/group-349091-1-144384f9"
    "rnj/optimized/group-363-1-a0d0a075"
    "rnj/optimized/group-352-3-8e109b3c"
    "rnj/optimized/group-444-70554d8f"
    "rnj/optimized/group-444-left-68489dda"
    "rnj/optimized/vector-22-5240d59f"
    "rnj/optimized/mask-group-44-3cbc4b7d"
    "rnj/mask-group-38-09146cc3"
    "rnj/mask-group-39-06a5eb07"
    "rnj/image-droit-des-contrats-se-curite-commerciale-5fe5d7a2"
    "rnj/optimized/wind-energy-wind-power-sustainable-renewable-en-2026-03-18-04-35-53-utc-1-84fe3c19"
    "rnj/optimized/mask-group-36-61b10456"
    "rnj/optimized/esg-conformit-appels-projets-b1d37fff"
    "rnj/group-349012-8572149e"
    "rnj/group-349017-391749d4"
    "rnj/handshake-387c4c1d"
    "rnj/earth-c9fdae9d"
    "rnj/methologie-648e7fd2"
    "rnj/check-mark-89a3c66e"
    "rnj/law-ec037074"
    "rnj/users-f9417797"
    "rnj/optimized/mask-group-34-8516afa4"
    "rnj/business-people-meeting-to-join-with-partner-team-2026-03-25-03-32-06-utc-10a13933"
    "rnj/layer-1-26-33e2a54e"
    "rnj/layer-1-27-a0d86191"
    "rnj/group-555-a5305936"
    "rnj/blog-0f03cf9e"
    "rnj/whatsapp-image-2026-04-19-at-12.52.25-pm-1-84a926a6"
    "rnj/group-349075-a2bbf73f"
    "rnj/group-527-v2-03944abc"
    "rnj/beautiful-architecture-building-exterior-cityscape-2026-01-05-01-06-47-utc-2-8e38423b"
    "rnj/frame-16-8d976706"
    "rnj/business-meeting-background-b7be96e9"
    "rnj/group-349020-a82fd32c"
    "rnj/chahine-88336938"
    "rnj/eya-44c9ccac"
    "rnj/ramzi-05917bd9"
    "rnj/nahla-eae48fe8"
    "rnj/pins-951a2bbe"
    "rnj/maps-10375837"
    "rnj/cd-c076eecb"
    "rnj/ne-27d79c5a"
    "rnj/bj-46e4c23a"
    "rnj/bf-82043e17"
    "rnj/gn-09d6746e"
    "rnj/sn-fa0dd3fe"
    "rnj/mr-f851e151"
    "rnj/tn-map-7a9a40cd"
    "rnj/twitter-home-0741522b"
    "rnj/og-home-f960652e"
    "rnj/twitter-contact-b57c71ae"
    "rnj/og-contact-af2e1910"
    "rnj/group-349031-1-46313aad"
    "rnj/optimized/group-65-16f18ed1"
    "rnj/optimized/frame-559-7811d1b0"
    "rnj/optimized/group-541-2-59ca9193"
    "rnj/optimized/group-541-1-5b55b5e0"
    "rnj/optimized/business-meeting-2026-01-08-00-07-57-utc-3-971f8e8a"
    "rnj/optimized/multinational-company-headquarters-office-with-a-b-2026-01-08-02-30-05-utc-1-bb7b9def"
    "rnj/asset-96a86689"
    "rnj/group-73892e5a"
    "rnj/mask-group-21-d1c01771"
    "rnj/mask-group-20-0d9c29f8"
    "rnj/mask-group-27-5870749d"
    "rnj/mask-group-26-a7a619cb"
    "rnj/mask-group-25-516d2f88"
    "rnj/mask-group-24-fd4f223e"
    "rnj/mask-group-23-1ce30be9"
    "rnj/frame-487-5f9f4c30"
    "rnj/map-3-380cf512"
    "rnj/group-481-8071b8c8"
    "rnj/group-484-04b278f7"
    "rnj/group-482-365877a7"
    "rnj/group-483-89ee6676"
    "rnj/layer-1-24-5765da83"
    "rnj/autre-3a5ebc68"
    "rnj/entrepreneur-855980d1"
    "rnj/investisseur-b14c1fbc"
    "rnj/institution-ff95583d"
    "rnj/frame-391-96629423"
    "rnj/vector-20-25c3631c"
    "rnj/group-67-4180bee4"
    "rnj/layer-1-3-08f03874"
    "rnj/group-4-c8bc5566"
    "rnj/group-3-ab3adbb8"
    "rnj/group-2-8d410a01"
    "rnj/vector-2-8beb62fa"
    "rnj/group-559-aaf6f0b3"
    "rnj/e-sdg-print-08-1-53b17059"
    "rnj/e-sdg-print-07-1-af43b2fc"
    "rnj/group-558-46fa6f2f"
    "rnj/group-352-32f4e599"
    "rnj/beci-2-1-241bb936"
    "rnj/group-353-8693f0d7"
    "rnj/group-363-02f81f30"
    "rnj/businessfotografie-bewerbungsfotos-berlin-kopf-kragen-1-f0daffa4"
    "rnj/jakub-zerdzicki-yknibjv0rby-unsplash-1-1b22cd9c"
    "rnj/group-349051-d2f123fc"
    "rnj/mask-group-18-c3bd04c7"
    "rnj/minimal-horizontal-logo-white-1-317aafcc"
    "rnj/group-349040-b40f156d"
    "rnj/mask-group-17-57db8ebe"
    "rnj/image-2-2c9f497b"
    "rnj/mask-group-16-f5d02d69"
    "rnj/layer-1-2-1d375d74"
    "rnj/group-1-23b4740e"
    "rnj/businesswoman-explaining-esg-strategy-during-meeti-2026-01-08-08-14-47-utc-1-a731531a"
    "rnj/openai-jake-stangel-1-c442a239"
    "rnj/vector-17-f73f224f"
    "rnj/group-541-2a130507"
    "rnj/light-bulb-1-1-aa32136c"
    "rnj/layer-4-955dc651"
    "rnj/that-makes-it-official-cropped-shot-of-two-uniden-2026-01-09-09-21-38-utc-1-72edb5b8"
    "rnj/pexels-henri-mathieu-8348468-1-9eb7df36"
    "rnj/mask-group-5-c793fd9f"
    "rnj/mask-group-4-f2eb00c6"
    "rnj/mask-group-3-2ece0ef0"
    "rnj/mask-group-11-4a32da53"
    "rnj/vector-18-18cc905b"
    "rnj/vector-19-81ce45a8"
    "rnj/mask-group-12-bfc180ab"
    "rnj/asset-28-1-d6d25061"
    "rnj/asset-27-1-8679f4ab"
    "rnj/asset-26-1-3d6250e2"
    "rnj/asset-24-1-1c05ea09"
    "rnj/asset-23-1-9c5664dc"
    "rnj/asset-22-1-ac5775de"
    "rnj/asset-21-1-6ad9b68e"
    "rnj/asset-17-1-5077f95f"
    "rnj/asset-16-1-41dc72e6"
    "rnj/asset-15-1-7f0249bf"
    "rnj/asset-14-1-cda0f5e7"
)

# Delete assets in batches of 10 to avoid API limits
batch_size=10
total_assets=${#unused_assets[@]}
deleted_count=0

for (( i=0; i<$total_assets; i+=$batch_size )); do
    batch_end=$((i + batch_size - 1))
    if [ $batch_end -ge $total_assets ]; then
        batch_end=$((total_assets - 1))
    fi
    
    echo "Deleting batch $((i/batch_size + 1)): assets $((i+1))-$((batch_end+1)) of $total_assets"
    
    # Build the public_ids parameter for this batch
    public_ids_param=""
    for (( j=i; j<=$batch_end && j<$total_assets; j++ )); do
        if [ -n "$public_ids_param" ]; then
            public_ids_param="${public_ids_param}&"
        fi
        public_ids_param="${public_ids_param}public_ids[]=${unused_assets[$j]}"
    done
    
    # Execute the delete request
    response=$(curl -s -X DELETE "https://api.cloudinary.com/v1_1/dmrtdo9z3/resources/image/upload" \
        -u "699751417834341:iljP8SEJRK9Jr5Mh9LRxX9Eg9sQ" \
        -d "$public_ids_param")
    
    # Check if deletion was successful
    if echo "$response" | grep -q '"deleted":true'; then
        deleted_in_batch=$(echo "$response" | grep -o '"deleted":true' | wc -l)
        deleted_count=$((deleted_count + deleted_in_batch))
        echo "✅ Successfully deleted $deleted_in_batch assets in this batch"
    else
        echo "❌ Error in batch deletion. Response: $response"
    fi
    
    sleep 1  # Rate limiting
done

echo "🎉 Cleanup completed! Deleted $deleted_count out of $total_assets unused assets."
echo "💰 Estimated storage saved: ~167 MB"

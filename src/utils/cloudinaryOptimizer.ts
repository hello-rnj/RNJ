/**
 * Cloudinary Image Optimization Utilities
 * Optimise les URLs Cloudinary pour de meilleures performances sans perte de qualité
 */

export interface CloudinaryOptimizationOptions {
  width?: number;
  height?: number;
  quality?: 'auto' | 'auto:best' | 'auto:good' | 'auto:eco' | number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  crop?: 'fill' | 'fit' | 'scale' | 'limit' | 'pad';
  gravity?: 'auto' | 'face' | 'center' | 'north' | 'south' | 'east' | 'west';
  fetchFormat?: 'auto';
  dpr?: 'auto' | number;
  flags?: string[];
}

/**
 * Optimise une URL Cloudinary avec les meilleures pratiques
 * @param url - URL Cloudinary originale
 * @param options - Options d'optimisation
 * @returns URL optimisée
 */
export function optimizeCloudinaryUrl(
  url: string,
  options: CloudinaryOptimizationOptions = {}
): string {
  if (!url || !url.includes('res.cloudinary.com')) {
    return url;
  }

  const {
    width,
    height,
    quality = 'auto:best', // Qualité automatique optimale
    format = 'auto', // Format automatique (WebP/AVIF si supporté)
    crop = 'limit',
    gravity,
    fetchFormat = 'auto',
    dpr = 'auto', // Device Pixel Ratio automatique
    flags = ['progressive'], // Chargement progressif
  } = options;

  // Extraire les parties de l'URL
  const urlParts = url.split('/upload/');
  if (urlParts.length !== 2) {
    return url;
  }

  const [baseUrl, assetPath] = urlParts;

  // Construire les transformations
  const transformations: string[] = [];

  // Format et qualité (les plus importants pour l'optimisation)
  if (fetchFormat) {
    transformations.push(`f_${fetchFormat}`);
  }
  if (quality) {
    transformations.push(`q_${quality}`);
  }

  // DPR automatique pour les écrans Retina
  if (dpr) {
    transformations.push(`dpr_${dpr}`);
  }

  // Dimensions
  if (width) {
    transformations.push(`w_${width}`);
  }
  if (height) {
    transformations.push(`h_${height}`);
  }

  // Crop et gravity
  if (crop && (width || height)) {
    transformations.push(`c_${crop}`);
  }
  if (gravity) {
    transformations.push(`g_${gravity}`);
  }

  // Flags
  if (flags.length > 0) {
    transformations.push(`fl_${flags.join('.')}`);
  }

  // Construire l'URL finale
  const transformationString = transformations.join(',');
  return `${baseUrl}/upload/${transformationString}/${assetPath}`;
}

/**
 * Génère un srcset pour le responsive loading
 * @param url - URL Cloudinary de base
 * @param widths - Tableau de largeurs pour le srcset
 * @returns String srcset
 */
export function generateCloudinarySrcSet(
  url: string,
  widths: number[] = [320, 640, 768, 1024, 1280, 1536, 1920]
): string {
  return widths
    .map((width) => {
      const optimizedUrl = optimizeCloudinaryUrl(url, {
        width,
        quality: 'auto:best',
        format: 'auto',
        dpr: 'auto',
      });
      return `${optimizedUrl} ${width}w`;
    })
    .join(', ');
}

/**
 * Génère les sizes pour le responsive loading
 * @param breakpoints - Breakpoints personnalisés
 * @returns String sizes
 */
export function generateSizes(
  breakpoints: { maxWidth: string; size: string }[] = [
    { maxWidth: '640px', size: '100vw' },
    { maxWidth: '768px', size: '100vw' },
    { maxWidth: '1024px', size: '100vw' },
    { maxWidth: '1280px', size: '100vw' },
  ]
): string {
  const sizeStrings = breakpoints.map(
    (bp) => `(max-width: ${bp.maxWidth}) ${bp.size}`
  );
  sizeStrings.push('100vw');
  return sizeStrings.join(', ');
}

/**
 * Optimise une URL pour les images hero/background (grandes images)
 */
export function optimizeHeroImage(url: string, width?: number): string {
  return optimizeCloudinaryUrl(url, {
    width: width || 1920,
    quality: 'auto:best',
    format: 'auto',
    crop: 'limit',
    flags: ['progressive', 'lossy'],
  });
}

/**
 * Optimise une URL pour les thumbnails/petites images
 */
export function optimizeThumbnail(url: string, size: number = 400): string {
  return optimizeCloudinaryUrl(url, {
    width: size,
    height: size,
    quality: 'auto:good',
    format: 'auto',
    crop: 'fill',
    gravity: 'auto',
  });
}

/**
 * Optimise une URL pour les logos/icônes (nécessite plus de netteté)
 */
export function optimizeLogo(url: string, width?: number): string {
  return optimizeCloudinaryUrl(url, {
    width,
    quality: 'auto:best',
    format: 'auto',
    flags: ['progressive'],
  });
}

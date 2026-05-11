'use client';

import Image, { ImageProps } from 'next/image';
import { optimizeCloudinaryUrl, generateCloudinarySrcSet, CloudinaryOptimizationOptions } from '@/utils/cloudinaryOptimizer';

interface OptimizedCloudinaryImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  alt: string;
  optimizationOptions?: CloudinaryOptimizationOptions;
  enableResponsive?: boolean;
  responsiveWidths?: number[];
}

/**
 * Composant Image optimisé pour Cloudinary
 * Applique automatiquement les meilleures pratiques d'optimisation
 */
export default function OptimizedCloudinaryImage({
  src,
  alt,
  optimizationOptions = {},
  enableResponsive = true,
  responsiveWidths = [320, 640, 768, 1024, 1280, 1536, 1920],
  ...props
}: OptimizedCloudinaryImageProps) {
  // Si ce n'est pas une URL Cloudinary, utiliser Image standard
  if (!src || !src.includes('res.cloudinary.com')) {
    return <Image src={src} alt={alt} {...props} />;
  }

  // Optimiser l'URL de base
  const optimizedSrc = optimizeCloudinaryUrl(src, {
    quality: 'auto:best',
    format: 'auto',
    dpr: 'auto',
    ...optimizationOptions,
  });

  // Générer srcset pour le responsive loading si activé
  const srcSet = enableResponsive 
    ? generateCloudinarySrcSet(src, responsiveWidths)
    : undefined;

  return (
    <Image
      src={optimizedSrc}
      alt={alt}
      {...(srcSet && { srcSet })}
      loading={props.priority ? 'eager' : 'lazy'}
      {...props}
    />
  );
}

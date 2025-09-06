import Image from "next/image";
import { useEffect, useState } from "react";
interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  width?: number;
  height?: number;
  fill?: boolean;
}
export function ImageWithFallback({
  src,
  alt,
  className,
  fallbackSrc = "/vercel.svg",
  width = 300,
  height = 300,
  fill = false,
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);
  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };
  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      unoptimized
    />
  );
}

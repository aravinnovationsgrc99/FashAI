"use client";

import Image from "next/image";
import Link from "next/link";

export interface FashAiLogoProps {
  variant?: "full" | "header" | "mobile-header" | "footer" | "preloader" | "admin" | "maintenance";
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  alt?: string;
  href?: string;
  onClick?: () => void;
}

export default function FashAiLogo({
  variant = "full",
  className = "",
  imgClassName = "",
  priority = false,
  sizes,
  alt = "FashAI Universal",
  href,
  onClick,
}: FashAiLogoProps) {
  // Define default variant dimensions & styling for aspect ratio ~1:1 (1263x1245)
  const variantStyles = {
    header: "w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 xl:w-[50px] xl:h-[50px]",
    "mobile-header": "w-9 h-9 sm:w-10 sm:h-10",
    footer: "w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16",
    preloader: "w-24 h-24 sm:w-28 sm:h-28",
    admin: "w-9 h-9 sm:w-10 sm:h-10",
    maintenance: "w-16 h-16 sm:w-20 sm:h-20",
    full: "w-10 h-10 sm:w-12 sm:h-12",
  };

  const defaultSizes = {
    header: "(max-width: 640px) 36px, (max-width: 1024px) 44px, 50px",
    "mobile-header": "40px",
    footer: "(max-width: 640px) 44px, 64px",
    preloader: "112px",
    admin: "40px",
    maintenance: "80px",
    full: "48px",
  };

  const containerClasses = `relative flex-shrink-0 inline-flex items-center justify-center transition-all duration-300 ${variantStyles[variant] || variantStyles.full} ${className}`;
  const finalSizes = sizes || defaultSizes[variant] || "48px";

  const logoElement = (
    <div className={containerClasses} onClick={onClick}>
      <Image
        src="/assets/brand/fashai_logo_final.png"
        alt={alt}
        fill
        priority={priority}
        sizes={finalSizes}
        className={`object-contain ${imgClassName}`}
      />
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center group w-fit">
        {logoElement}
      </Link>
    );
  }

  return logoElement;
}

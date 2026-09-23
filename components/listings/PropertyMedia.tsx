"use client";

import { useState } from "react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "yet-another-react-lightbox/styles.css";

import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

/** Full-screen autoplay slider at the top of the details page. */
export function HeroSlider({ images, alt }: { images: string[]; alt: string }) {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation
      autoplay={{ delay: 4000 }}
      loop
      className="h-full"
      style={
        {
          "--swiper-navigation-color": "var(--color-primary)",
        } as React.CSSProperties
      }
    >
      {images.map((img, idx) => (
        <SwiperSlide key={idx}>
          <div className="relative w-full h-full">
            <Image
              src={img}
              alt={`${alt} - photo ${idx + 1}`}
              fill
              priority={idx === 0} // optimize first image
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

const GALLERY_LIMIT = 7;

/** Masonry thumbnails that open the full set in a lightbox. */
export function PhotoGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const displayedImages = images.slice(0, GALLERY_LIMIT);
  const extraCount = images.length - displayedImages.length;

  const open = (index: number) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  return (
    <div className="columns-2 gap-4 space-y-4">
      {displayedImages.map((img, idx) => (
        <div
          key={idx}
          onClick={() => open(idx)}
          className="relative overflow-hidden border border-border shadow cursor-pointer"
        >
          <Image
            src={img}
            alt={`${title} - gallery photo ${idx + 1}`}
            width={600}
            height={400}
            className=" hover:scale-105 transition"
          />
        </div>
      ))}
      {extraCount > 0 && (
        <div
          className="relative h-40 flex items-center justify-center bg-surface-elevated border border-border rounded-xl font-serif text-3xl text-primary cursor-pointer"
          onClick={() => open(displayedImages.length)}
        >
          +{extraCount} more
        </div>
      )}

      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={images.map((img) => ({ src: img }))}
          index={photoIndex}
          plugins={[Fullscreen, Slideshow]}
        />
      )}
    </div>
  );
}

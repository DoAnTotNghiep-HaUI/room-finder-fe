import React, { useState, useEffect, useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./EnblaCarouselThumbsButton";

type PropType = {
  slides: string[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(slides[0]);

  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi) return;
    const index = emblaMainApi.selectedScrollSnap();
    setSelectedIndex(index);
    setSelectedImage(slides[index]);
  }, [emblaMainApi, slides]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="embla">
      <div
        className="embla__viewport"
        ref={emblaMainRef}
      >
        <div className="embla__container">
          {slides.map((index) => (
            <div
              className="embla__slide"
              key={index}
            >
              <div className="inset-shadow-xs flex select-none items-center justify-center rounded-xl">
                <img
                  src={index}
                  alt="#"
                  className="aspect-video w-full rounded-lg object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla-thumbs">
        <div
          className="embla-thumbs__viewport"
          ref={emblaThumbsRef}
        >
          <div className="embla-thumbs__container">
            {slides.map((imageUrl, index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
              >
                <img
                  src={imageUrl}
                  alt={`Thumbnail ${index + 1}`}
                />
              </Thumb>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;

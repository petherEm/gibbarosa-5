"use client";

import { useCallback, useEffect, useState } from "react";
import { Box } from "@/components/common/components/box";
import { Heading } from "@/components/common/components/heading";
import useEmblaCarousel from "embla-carousel-react";

interface CarouselWrapperProps {
  children: React.ReactNode;
  title: string;
  productsCount: number;
}

export default function CarouselWrapper({
  children,
  title,
  productsCount,
}: CarouselWrapperProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    loop: false,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const isLessThanFourProducts = productsCount < 4;
  const isLessThanThreeProducts = productsCount < 3;
  const isLessThanTwoProducts = productsCount < 2;

  return (
    <>
      <Box className="flex justify-between">
        <Heading as="h2" className="text-2xl text-basic-primary small:text-3xl">
          {title}
        </Heading>
      </Box>
      <div ref={emblaRef}>{children}</div>
    </>
  );
}

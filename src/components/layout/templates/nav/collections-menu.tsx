"use client";

import Image from "next/image";
import { StoreCollection } from "@medusajs/types";
import { Box } from "@/components/common/components/box";
import { Button } from "@/components/common/components/button";
import { Container } from "@/components/common/components/container";
import { Heading } from "@/components/common/components/heading";
import LocalizedClientLink from "@/components/common/components/localized-client-link";
import { Text } from "@/components/common/components/text";
import { CollectionsData } from "@/types/strapi";

export default function CollectionsMenu({
  medusaCollections,
}: {
  cmsCollections?: CollectionsData;
  medusaCollections: StoreCollection[];
}) {
  // const newestCollections = ['bags', 'shoes', 'clothing', 'accessories']
  const newestCollections = medusaCollections.map((i) => i.title);

  return (
    <Container className="grid grid-cols-3 gap-2 !px-14 !pb-8 !pt-5">
      {newestCollections.slice(0, 3).map((i) => (
        <CollectionTile
          key={i}
          title={i}
          description="Discover our iconic bags."
          handle={i}
          imgSrc="https://gibbarosa.fra1.cdn.digitaloceanspaces.com/Elegant_sandals.png"
        />
      ))}
    </Container>
  );
}

const CollectionTile = ({
  title,
  description,
  handle,
  imgSrc,
}: {
  title: string;
  description: string;
  handle: string;
  imgSrc: string;
}) => {
  return (
    <Box className="group relative max-h-[282px]">
      <Image
        src={imgSrc}
        alt={`${title} collection image`}
        width={600}
        height={300}
        className="h-full w-full object-cover object-center"
      />
      <Box className="absolute left-0 top-0 flex h-full w-full flex-col p-10">
        <Button
          asChild
          className="w-max self-end transition-all duration-500 ease-in-out"
        >
          <LocalizedClientLink href={`/collections/${handle}`}>
            Discover
          </LocalizedClientLink>
        </Button>
        <Box className="mt-auto flex flex-col gap-2 text-static">
          <LocalizedClientLink
            href={`/collections/${handle}`}
            className="w-max"
          >
            <Heading
              as="h3"
              className="mt-auto text-3xl capitalize text-static"
            >
              {title}
            </Heading>
          </LocalizedClientLink>
          <Text
            size="lg"
            className="line-clamp-2 transition-all duration-500 ease-in-out"
          >
            {description}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

import { useMemo } from "react";

import { Badge } from "@/components/common/components/badge";
import { Box } from "@/components/common/components/box";
import LocalizedClientLink from "@/components/common/components/localized-client-link";
import { Text } from "@/components/common/components/text";
import { StoreProduct } from "@medusajs/types";

import { ProductActions } from "./action";
import { LoadingImage } from "./loading-image";
import ProductPrice from "./price";

export function ProductTileClient({
  regionId,
  product,
  cheapestPrice,
}: {
  regionId: string;
  product: StoreProduct;
  cheapestPrice: {
    calculated_price_number: any;
    calculated_price: string;
    original_price_number: any;
    original_price: string;
    currency_code: any;
    price_type: any;
    percentage_diff: string;
  };
}) {
  const isNew = useMemo(() => {
    const createdAt = new Date(product.created_at!);
    const currentDate = new Date();
    const differenceInDays =
      (currentDate.getTime() - createdAt.getTime()) / (1000 * 3600 * 24);

    return differenceInDays <= 100;
  }, [product.created_at]);

  console.log("RegionID from ProductTileClient", regionId);
  return (
    <Box className="group flex flex-col">
      <Box className="relative h-[290px] small:h-[400px]">
        {isNew && (
          <Box className="absolute left-3 top-3 z-10 small:left-5 small:top-5">
            <Badge label="New" variant="brand" />
          </Box>
        )}
        <LocalizedClientLink href={`/products/${product.handle}`}>
          <LoadingImage
            src={product.thumbnail || "placeholder.jpg"}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </LocalizedClientLink>
        <ProductActions product={product} regionId={regionId} />
      </Box>
      <ProductInfo product={product} cheapestPrice={cheapestPrice} />
    </Box>
  );
}

function ProductInfo({
  product,
  cheapestPrice,
}: {
  product: StoreProduct;
  cheapestPrice: {
    calculated_price_number: number;
    calculated_price: string;
    original_price_number: number;
    original_price: string;
    currency_code: string;
    price_type: string;
    percentage_diff: string;
  };
}) {
  return (
    <Box className="flex flex-col items-start gap-3 p-4 text-left small:gap-6 small:px-0 small:py-3">
      <div className="flex flex-col items-start gap-4">
        <LocalizedClientLink
          href={`/products/${product.handle}`}
          className="mx-auto w-max"
        >
          <Text
            title={product.subtitle || "Brand name"}
            as="span"
            className="line-clamp-2 text-left text-lg text-basic-primary"
          >
            {product.subtitle}
          </Text>
          <Text
            title={product.title}
            as="span"
            className="line-clamp-2 text-left text-lg text-basic-primary"
          >
            {product.title}
          </Text>
        </LocalizedClientLink>
        <ProductPrice
          calculatedPrice={cheapestPrice.calculated_price}
          salePrice={cheapestPrice.original_price}
        />
      </div>
    </Box>
  );
}

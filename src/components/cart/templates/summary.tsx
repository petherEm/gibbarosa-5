"use client";

import { HttpTypes } from "@medusajs/types";
import DiscountCode from "@/components/checkout/components/discount-code";
import { Box } from "@/components/common/components/box";
import { Button } from "@/components/common/components/button";
import CartTotals from "@/components/common/components/cart-totals";
import LocalizedClientLink from "@/components/common/components/localized-client-link";

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[];
  };
};

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address";
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery";
  } else {
    return "payment";
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart);

  return (
    <Box className="flex w-full flex-col gap-2 large:w-[326px] xl:w-[437px]">
      <DiscountCode cart={cart} />
      <Box className="flex flex-col gap-5 bg-primary p-5">
        <CartTotals totals={cart} />
        <LocalizedClientLink
          href={"/checkout?step=" + step}
          data-testid="checkout-button"
        >
          <Button className="w-full">Proceed to checkout</Button>
        </LocalizedClientLink>
      </Box>
    </Box>
  );
};

export default Summary;

import { checkoutFooterNavigation } from "@/lib/constants";
import { Box } from "@/components/common/components/box";
import { Button } from "@/components/common/components/button";
import { Container } from "@/components/common/components/container";
import { Heading } from "@/components/common/components/heading";
import LocalizedClientLink from "@/components/common/components/localized-client-link";
import { NavigationItem } from "@/components/common/components/navigation-item";
import { Text } from "@/components/common/components/text";
import {
  BlikIcon,
  HeadphonesIcon,
  KlarnaIcon,
  MaestroIcon,
  MastercardIcon,
  ShopPayIcon,
  StripeIcon,
  VisaIcon,
} from "@/components/common/icons";

export default function CheckoutFooter() {
  return (
    <Container
      as="footer"
      className="mx-0 max-w-full bg-static px-0 py-0 small:px-0 small:py-0"
    >
      <Container className="flex flex-col gap-8 text-static">
        <Box className="flex flex-col gap-4 small:flex-row small:items-center">
          <Heading className="text-lg text-static">Have questions?</Heading>
          <Button size="sm" withIcon asChild className="w-max">
            <LocalizedClientLink href="#">
              <HeadphonesIcon />
              Use Instagram Messaging to contact us directly
            </LocalizedClientLink>
          </Button>
        </Box>
        <Box className="flex flex-col-reverse gap-6 medium:flex-row medium:items-end medium:justify-between">
          <Box className="flex flex-wrap gap-6 gap-y-1">
            <Text size="md" className="shrink-0 text-secondary">
              © {new Date().getFullYear()} Gibbarosa. All rights reserved.
            </Text>
            {checkoutFooterNavigation.map((link, id) => (
              <NavigationItem
                key={`other-${id}`}
                variant="secondary"
                className="shrink-0 hover:text-static"
                href={link.href}
              >
                {link.title}
              </NavigationItem>
            ))}
          </Box>
          <Box className="flex flex-wrap items-center gap-2">
            <StripeIcon />
            <VisaIcon />
            <MastercardIcon />
            <MaestroIcon />
            <BlikIcon />
            <ShopPayIcon />
            <KlarnaIcon />
          </Box>
        </Box>
      </Container>
    </Container>
  );
}

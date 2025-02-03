import { Box } from "@/components/common/components/box";
import CartButton from "@/components/layout/components/cart-button";
import ProfileButton from "@/components/layout/components/profile-button";

export default function NavActions() {
  return (
    <Box className="flex items-center !py-4">
      <ProfileButton />
      <CartButton />
    </Box>
  );
}

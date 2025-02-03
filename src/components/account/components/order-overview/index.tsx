import { HttpTypes } from "@medusajs/types";
import { Box } from "@/components/common/components/box";
import { Heading } from "@/components/common/components/heading";
import { Text } from "@/components/common/components/text";
import { BoxIcon } from "@/components/common/icons";
import { Pagination } from "@/components/store/components/pagination";

import OrderCard from "../order-card";

export interface OrderType extends HttpTypes.StoreOrder {
  status: string;
}

const OrderOverview = ({
  orders,
  page,
}: {
  orders: OrderType[];
  page: string;
}) => {
  const ORDERS_LIMIT = 10;
  const totalPages = Math.ceil(orders.length / ORDERS_LIMIT);
  const pageNumber = page ? parseInt(page) : 1;

  if (orders?.length) {
    return (
      <Box className="flex flex-col gap-8">
        <Box className="flex w-full flex-col gap-4">
          {orders.map((o) => (
            <OrderCard key={o.id} order={o} />
          ))}
        </Box>
        {totalPages > 1 && (
          <Pagination
            data-testid="orders-pagination"
            page={pageNumber}
            totalPages={totalPages}
          />
        )}
      </Box>
    );
  }

  return <NoOrders />;
};

export function NoOrders() {
  return (
    <Box
      className="flex w-full flex-col items-center gap-6"
      data-testid="no-orders-container"
    >
      <BoxIcon />
      <Box className="flex flex-col items-center gap-2">
        <Heading as="h2" className="text-xl text-basic-primary small:text-2xl">
          No order updates
        </Heading>
        <Text className="max-w-[438px] text-center text-md text-secondary">
          No latest updates on your orders. Start shopping to see your latest
          order activity here.
        </Text>
      </Box>
    </Box>
  );
}

export default OrderOverview;

import { listCategories } from "@/lib/data/categories";
import { getCollectionsList } from "@/lib/data/collections";
import { getProductsList } from "@/lib/data/products";
import { Container } from "@/components/common/components/container";

import NavActions from "./nav-actions";
import NavContent from "./nav-content";

export default async function NavWrapper(props: any) {
  const [productCategories, { collections }, { products }] = await Promise.all([
    listCategories(),
    getCollectionsList(),

    getProductsList({
      pageParam: 0,
      queryParams: { limit: 4 },
      countryCode: props.countryCode,
    }).then(({ response }) => response),
  ]);

  return (
    <Container
      as="nav"
      className="duration-400 sticky top-0 z-50 mx-0 max-w-full border-b border-basic-primary bg-primary !py-0 transition-all ease-in-out medium:!px-14"
    >
      <Container className="flex items-center justify-between !p-0">
        <NavContent
          productCategories={productCategories}
          collections={collections}
          // at this moment featuredCollections === collections
          countryCode={props.countryCode}
          products={products}
        />
        <NavActions />
      </Container>
    </Container>
  );
}

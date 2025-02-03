import { Suspense } from "react";
import { Metadata } from "next";
import { getCollectionsList } from "@/lib/data/collections";
import { getProductsList } from "@/lib/data/products";
import { getRegion } from "@/lib/data/regions";
// import { ExploreBlog } from "@/components/home/components/explore-blog";
import Hero from "@/components/home/components/hero";
import { ProductCarousel } from "@/components/products/components/product-carousel";
import SkeletonProductsCarousel from "@/components/skeletons/templates/skeleton-products-carousel";
import SubHero from "@/components/home/components/sub-hero";
import MidBanner from "@/components/home/components/mid-banner";
import InstaFeed from "@/components/home/components/insta-feed";
import NewsletterBanner from "@/components/home/components/newsletter-banner";

export const metadata: Metadata = {
  title: "Gibbarosa v5 | Preowned Luxury",
  description: "Gibbarosa - Preowned Luxury",
};

export default async function Home(props: {
  params: Promise<{ countryCode: string }>;
}) {
  const params = await props.params;

  const { countryCode } = params;

  const [{ collections: collectionsList }, { products }] = await Promise.all([
    getCollectionsList(),
    getProductsList({
      pageParam: 1,
      queryParams: { limit: 9 },
      countryCode: countryCode,
    }).then(({ response }) => response),
  ]);

  const region = await getRegion(countryCode);

  if (!products || !collectionsList || !region) {
    return null;
  }

  // MOVE IT POTENTIALLY TO LIB AS A FILTERED PRODUCT FETCHING

  // Find the "New" collection
  const newCollection = collectionsList.find(
    (collection) => collection.title === "New" || collection.handle === "new"
  );

  // Filter products belonging to the "New" collection
  const newCollectionProducts =
    products.filter(
      (product) => product.collection?.id === newCollection?.id
    ) || [];

  return (
    <>
      <Hero />
      <SubHero />
      <Suspense fallback={<SkeletonProductsCarousel />}>
        <ProductCarousel
          products={newCollectionProducts}
          regionId={region.id}
          title="New"
          viewAll={{
            link: "/store",
            text: "View all",
          }}
        />
      </Suspense>
      <MidBanner />
      <ProductCarousel
        products={products}
        regionId={region.id}
        title="Icons"
        viewAll={{
          link: "/store",
          text: "View all",
        }}
      />
      <NewsletterBanner />

      <InstaFeed />
    </>
  );
}

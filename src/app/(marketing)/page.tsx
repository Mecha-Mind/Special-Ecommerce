import { products } from "@/data/products";
import ProductBrowser from "@/components/ProductBrowser";
import Hero from "@/components/Hero";

const Homepage = () => {
  return (
    <>
      <Hero />

      <h1 className="mb-4 mt-10 text-2xl font-semibold tracking-tight text-stone-900">
        Featured products
      </h1>
      <ProductBrowser products={products} />
    </>
  );
};

export default Homepage;

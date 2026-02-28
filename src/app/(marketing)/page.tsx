import { products } from '@/data/products';
import ProductBrowser from '@/components/ProductBrowser';
import Hero from '@/components/Hero';

const Homepage = () => {
  return (
    <main className='mx-auto max-w-6xl px-4 py-6'>

      <Hero/>

      <h1 className='text-2xl font-semibold mb-4'>Products</h1>
      <ProductBrowser products={products} />
    </main>
  )
}

export default Homepage
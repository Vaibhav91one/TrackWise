import HeroCarousel from '@/components/HeroCarousel'
import Searchbar from '@/components/Searchbar'
import Image from 'next/image'
import { getAllProducts } from '@/lib/actions'
import React from 'react'
import ProductCard from '@/components/ProductCard'

type Props = {}

const Home = async(props: Props) => {

  const allProducts = await getAllProducts();

  return (
    <>
      <section className='px-6 md:px-20 py-24'>
        <div className='flex max-xl:flex-col gap-16'>
          <div className='flex flex-col justify-center'>
            <p className='small-text'>
              Smart Shopping Starts Here!
              <Image
                src="/assets/icons/arrow-right.svg"
                width={16}
                height={16}
                alt='arrow-right'
              />
            </p>

            <h1 className='head-text'>
              Unleash the Power of
              <span className='text-primary'>
                {" "}TrackWise
              </span>
            </h1>

            <p className='mt-6'>
              Effortlessly track prices and stay informed.
              Our price scraping tool helps you monitor product prices across the web, saving you time and money. Simply enter the product URL and we'll automatically track price changes, notifying you when the price drops or rises. Make informed buying decisions and never miss a good deal again!
            </p>
            <Searchbar />


          </div>

          <HeroCarousel />

        </div>
      </section>

      <section className='trending-section' >
        <h2 className='section-text'>
          Trending
        </h2>

        <div className='flex flex-wrap gap-x-8 gap-y-16'>
            {allProducts?.map((product)=>(
                <ProductCard product={product} key={product._id} />                
            ))}
        </div>

      </section>

    </>
  )
}

export default Home
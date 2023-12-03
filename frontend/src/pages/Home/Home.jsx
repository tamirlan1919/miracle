import React from 'react'
import Carousel from '../../components/carousel/Carousel'
import CarousBrands from '../../components/carousel-brands/CarousBrands'
import ProductCard from '../../components/ProductCard/ProductCard'
import FooterComp, { Footer } from '../../components/Footer/Footer'
const Home = () => {
  return (
<>

    <Carousel/>
    <CarousBrands/>
    <h1 className='text-2xl text-center py-10'>Новинки</h1>
    <ProductCard/>


</>
  )
}

export default Home

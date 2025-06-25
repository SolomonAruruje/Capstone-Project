import React from 'react'
import Navbar from '../Components/Navbar.jsx';
import Banner1 from '../Components/Banner1.jsx';
import Footer from '../Components/Footer.jsx';
import FlashSales from '../Components/FlashSales.jsx';
import Categories from '../Components/Category.jsx'
import BestSellingProducts from '../Components/BestSellingProducts.jsx';
import OurProducts from '../Components/OurProducts.jsx';
import NewArrival from '../Components/NewArrival.jsx';
// import Test from '../Components/test.jsx';

const Homepage = () => {
  return (
    <div>
        <Navbar/>
        <Banner1/>
        <FlashSales/>
        <Categories/>
        <BestSellingProducts/>
        <OurProducts/>
        <NewArrival/>
        <Footer/>
    </div>
  )
}

export default Homepage
import React from 'react'
import Navbar from '../Components/Navbar.jsx';
import Banner1 from '../Components/Banner1.jsx';
import Footer from '../Components/Footer.jsx';
import FlashSales from '../Components/FlashSales.jsx';
// import Test from '../Components/test.jsx';

const Homepage = () => {
  return (
    <div>
        <Navbar/>
        <Banner1/>
        <FlashSales/>
        <Footer/>
    </div>
  )
}

export default Homepage
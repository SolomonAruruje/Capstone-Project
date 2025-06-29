import React from 'react'
import Navbar from '../Components/Navbar.jsx';
import Footer from '../Components/Footer.jsx';
import Wishlist from '../Components/Wishlist.jsx';
import JustForYou from '../Components/JustFor.jsx';

const WishlistPage = () => {
  return (
    <div>
        <Navbar/>
        <Wishlist/>
        <JustForYou/> 
        <Footer/>
    </div>
  )
}

export default WishlistPage
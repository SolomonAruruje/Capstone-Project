import React from 'react';
import Navbar from '../Components/Navbar.jsx';
import Footer from '../Components/Footer.jsx';
import AllProducts from '../Components/AllProducts.jsx';

const AllProductsPage = () => {
    return (
        <div>
            <Navbar/>
            <AllProducts/>
            <Footer/>
        </div>
    );
};

export default AllProductsPage
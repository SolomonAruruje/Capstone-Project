// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './Pages/Homepage.jsx';
import FlashSalesViewAllPage from './Pages/FlashSalesViewAll.jsx';
import CategoryDetailPage from './Components/CategoryDetailPage.jsx';
import BestSellingProductsAll from './Pages/BestSellingProductsAll.jsx';
import CreateAccount from './Pages/CreateAccount.jsx';
import LogIn from './Pages/Login.jsx';
import AllProductsPage from './Pages/AllProductsPage.jsx';
import WishlistPage from './Pages/WishlistPage.jsx';
import NotFoundPage from './Pages/NotFoundPage.jsx';
import Contact from './Pages/Contact.jsx';
import ManageAccount from './Pages/ManageAccount.jsx';
import About from './Pages/About.jsx';
import { AuthProvider } from './AuthContext.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';
import JustForAll from './Components/JustForAll.jsx';
import CheckoutPage from './Pages/CheckoutPage.jsx';
import ProductDetailsPage from './Pages/ProductDetailsPage.jsx';


const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flash-sales" element={<FlashSalesViewAllPage />} />
          <Route path="/categories/:keyword" element={<CategoryDetailPage />} />
          <Route path='/best-selling' element={<BestSellingProductsAll />} />
          <Route path="/SignUp" element={<CreateAccount />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/explore-products" element={<AllProductsPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='/About' element={<About/>} />
          <Route path='/justforyou' element={<JustForAll/>}/>
          <Route path='/checkout' element={<CheckoutPage/>}/>
          <Route path="/product-details/:productId" element={<ProductDetailsPage />} />

          {/* <Route path="/manage-account" element={<ManageAccount />} /> */}


          <Route element={<PrivateRoute />}>
            <Route path="/manage-account" element={<ManageAccount />} />
            {/* Add any other pages you want to protect here */}
            {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
            {/* <Route path="/order-history" element={<OrderHistoryPage />} /> */}
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
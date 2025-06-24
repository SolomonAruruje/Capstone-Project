import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from '../src/Pages/Homepage.jsx';
import FlashSalesViewAllPage from '../src/Pages/FlashSalesViewAll.jsx';
import CategoryDetailPage from '../src/Components/CategoryDetailPage.jsx';
import BestSellingProductsAll from '../src/Pages/BestSellingProductsAll.jsx';
import CreateAccount from './Pages/CreateAccount.jsx';
import LogIn from './Pages/Login.jsx';
import AllProductsPage from './Pages/AllProductsPage.jsx'
// import Error404 from './pP

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flash-sales" element={<FlashSalesViewAllPage />} />
        <Route path="/categories/:categoryName" element={<CategoryDetailPage />} />
        <Route path='/best-selling' element={<BestSellingProductsAll/>}/>
        <Route path="/SignUp" element={<CreateAccount/>} />
        <Route path="/LogIn" element={<LogIn/>} />
        <Route path="/explore-products" element={<AllProductsPage />} /> 
        {/* <Route path="*" element={<Error404 />} /> */}
      </Routes>
    </Router>
  )
}

export default App
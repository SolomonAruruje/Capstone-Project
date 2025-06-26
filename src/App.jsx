import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import { QuickViewProvider } from '../src/Components/QuickViewContext.jsx'
import HomePage from '../src/Pages/Homepage.jsx';
import FlashSalesViewAllPage from '../src/Pages/FlashSalesViewAll.jsx';
import CategoryDetailPage from '../src/Components/CategoryDetailPage.jsx';
import BestSellingProductsAll from '../src/Pages/BestSellingProductsAll.jsx';
import CreateAccount from './Pages/CreateAccount.jsx';
import LogIn from './Pages/Login.jsx';
import AllProductsPage from './Pages/AllProductsPage.jsx'
// import Error404 from './Pages/Error404.jsx

const App = () => {
  return (
    // <QuickViewProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flash-sales" element={<FlashSalesViewAllPage />} />
          <Route path="/categories/:keyword" element={<CategoryDetailPage />} />
          <Route path='/best-selling' element={<BestSellingProductsAll/>}/>
          <Route path="/SignUp" element={<CreateAccount/>} />
          <Route path="/LogIn" element={<LogIn/>} />
          <Route path="/explore-products" element={<AllProductsPage />} /> 
          {/* <Route path="*" element={<Error404 />} /> */}
        </Routes>
      </Router>
    // </QuickViewProvider>
  )
}

export default App
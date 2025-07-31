import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar.jsx';
import Footer from '../Components/Footer.jsx';

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId;

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center my-[100px] h-screen">
        <div className="max-w-xl text-center p-8 border rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-green-600 mb-4">Order Placed Successfully!</h1>
          {orderId ? (
            <p className="text-lg text-gray-700">
              Thank you for your purchase. Your order has been confirmed, and an email with the details will be sent shortly.
            </p>
          ) : (
            <p className="text-lg text-gray-700">
              Thank you for your purchase!
            </p>
          )}
          {orderId && (
            <p className="text-xl font-bold mt-4">
              Your Order ID is: <span className="text-[#DB4444]">{orderId}</span>
            </p>
          )}
          <button
            onClick={handleGoHome}
            className="mt-8 px-8 py-3 bg-[#DB4444] text-white rounded-lg hover:bg-red-600 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;
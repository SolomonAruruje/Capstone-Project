// src/Cart.jsx
import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import CartProduct2 from '../Components/CartProduct2';
import CartHeading from '../Components/CartHeading';
import { useCart } from '../CartContext';

const Cart = () => {
  const { cartItems } = useCart(); 

  const cartSubTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = 1500; 
  const cartTotal = cartSubTotal + shippingFee;

  const handleUpdateCart = () => {
    console.log("Cart updated (quantities are already managed by individual product inputs)");
  };

  return (
    <div>
      <Navbar />
      <div>
        <CartHeading />
        <div>
          {cartItems.length === 0 ? (
            <div className="text-[16px] font-normal text-gray-600 w-full text-center py-10">Your cart is empty.</div>
          ) : (
            cartItems.map((item) => (
              <CartProduct2
                key={item.id}
                id={item.id}
                productName={item.name}
                productImage={item.imageUrls?.[0]}
                Price={item.price}
                subTotal={item.price * item.quantity}
                initialQuantity={item.quantity} 
                maxQuantity={item.quantity} 
              />
            ))
          )}
        </div>

        {/* Bottom controls */}
        <div className='flex text-[16px] my-10 font-medium justify-between'>
          <a href="/explore-products">
            <button className='w-[218px] h-[56px] border border-[#000000] rounded-lg hover:bg-[#DB4444] hover:text-white hover:border-none'>
              Return to Shop
            </button>
          </a>
          <button onClick={handleUpdateCart} className='w-[195px] h-[56px] border border-[#000000] rounded-lg hover:bg-[#DB4444] hover:text-white hover:border-none'>
            Update Cart
          </button>
        </div>

        {/* Cart Summary */}
        <div className='my-20 flex justify-between items-start'>
          <form method='post' className='flex items-center space-x-3'>
            <input placeholder='Coupon Code' type="text" className='w-[300px] h-[56px] focus:outline-none rounded-lg px-4 border border-[#000000]' />
            <button type='submit' className='w-[211px] h-[56px] text-white bg-[#DB4444] hover:bg-red-600 rounded-lg p-2'>Apply Coupon</button>
          </form>
          <div className='w-[470px] h-[324px] border-2 rounded-lg text-[16px] font-normal space-y-7 px-7 flex flex-col justify-center'>
            <h4 className='text-[20px] font-medium text-start'>Cart Total</h4>
            <div className='w-full flex justify-between border-b pb-2'>
              <p>Subtotal:</p>
              <p>&#8358;{cartSubTotal}</p>
            </div>
            <div className='w-full flex justify-between border-b pb-2'>
              <p>Shipping</p>
              <p>&#8358;{shippingFee}</p>
            </div>
            <div className='w-full flex justify-between'>
              <p>Total</p>
              <p>&#8358;{cartTotal}</p>
            </div>
            <div className='mx-auto'>
              <button className='font-medium w-[260px] h-[56px] bg-[#DB4444] hover:bg-red-600 text-white rounded-lg'>Proceed to Checkout</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
import React, { useEffect, useState } from 'react'
import CartProduct from './CartProduct'
import visa from '../assets/mastercard.svg'
import mastercard from '../assets/visa.svg'
import nagad from '../assets/nagad.svg'
import bkash from '../assets/bkash.svg'

const BillingDetails = ({subTotal, shippingFee, total}) => {
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [errorProducts, setErrorProducts] = useState(null);


    useEffect(() => {
            const fetchProducts = async () => {
                setLoadingProducts(true);
                setErrorProducts(null);
                try {
                    const response = await fetch('/cartproducts.json');
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setProducts(data);
                } catch (err) {
                    console.error('Failed to fetch products:', err);
                    setErrorProducts(`Failed to load products: ${err.message}.`);
                    setProducts([]);
                } finally {
                    setLoadingProducts(false);
                }
            };
    
            fetchProducts();
        }, []);


  return (
    <div className='my-[50px]'>
        <h3 className='text-[16px] font-medium'>Billing Details</h3>
        <div className='flex flex-col md:flex-row mt-7 space-y-10 md:space-y-0 md:justify-between'>
            <div className='w-[95%] md:w-[43%] pb-7 border-b md:border-none md:pb-0'>
                <form action='' className='flex flex-col space-y-2'>
                    <label htmlFor="firstName" className='text-[16px] font-normal mt-4'>First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name='firstName'
                      className='bg-[#F5F5F5] w-full h-[50px] px-3 focus:outline-none'
                      />
                    <label htmlFor="companyName" className='text-[16px] font-normal mt-4'>Company Name</label>
                    <input
                      type="text"
                      id="companyName"
                      name='companyName'
                      className='bg-[#F5F5F5] w-full h-[50px] px-3 focus:outline-none'
                      />
                    <label htmlFor="streetAddress" className='text-[16px] font-normal mt-4'>Street Address</label>
                    <input
                      type="text"
                      id="streetAddress"
                      name='streetAddress'
                      className='bg-[#F5F5F5] w-full h-[50px] px-3 focus:outline-none'
                      />
                    <label htmlFor="apartmentNo" className='text-[16px] font-normal mt-4'>Apartment, Floor, etc. &40;optional&41;</label>
                    <input
                      type="text"
                      id="apartmentNo"
                      name='apartmentNo'
                      className='bg-[#F5F5F5] w-full h-[50px] px-3 focus:outline-none'
                      />
                    <label htmlFor="townCity" className='text-[16px] font-normal mt-4'>Town/City</label>
                    <input
                      type="text"
                      id="townCity"
                      name='townCity'
                      className='bg-[#F5F5F5] w-full h-[50px] px-3 focus:outline-none'
                      />
                    <label htmlFor="phone" className='text-[16px] font-normal mt-4'>Phone Number</label>
                    <input
                      type="text"
                      id="phone"
                      name='phone'
                      className='bg-[#F5F5F5] w-full h-[50px] px-3 focus:outline-none'
                      />
                    <label htmlFor="email" className='text-[16px] font-normal mt-4'>Email Address</label>
                    <input
                      type="text"
                      id="email"
                      name='email'
                      className='bg-[#F5F5F5] w-full h-[50px] px-3 focus:outline-none'
                      />
                    <label htmlFor="saveInfo">
                        <input 
                        type="checkbox" 
                        id='saveInfo'
                        name='saveInfo'
                        value='yes'
                        className='text-[16px] font-medium'
                        />
                        Save this information for faster check-out next time
                    </label>
                  </form>
            </div>
            <div className='w-[95%] md:w-[40%] space-y-10 flex flex-col'>
                <div>
                    {loadingProducts ? (
                        <div className="text-[16px] font-bold text-gray-400 w-full text-center">Loading products...</div>
                    ) : errorProducts ? (
                        <div className="text-[16px] font-normal text-gray-600 w-full text-center">No product found. <a href="/" className='text-[#DB4444] underline'>Countinue Shopping</a></div>
                    ) : (
                        products.map((item) => (
                    <CartProduct
                        key={item.id}
                        productImage={item.productImage}
                        productName={item.productName}
                        discountPrice={item.discountPrice}
                    />
                        ))
                    )}
                </div>
                <div className='flex justify-between border-b pb-1.5'>
                    <p>Subtotal</p>
                    <p>&#8358;{subTotal}</p>
                </div>
                <div className='flex justify-between border-b pb-1.5'>
                    <p>Shipping</p>
                    <p>&#8358;{shippingFee}</p>
                </div>
                <div className='flex justify-between'>
                    <p>Total</p>
                    <p>&#8358;{total}</p>
                </div>
                <div className='flex justify-between'>
                    <div>
                        <label htmlFor='bank'><input type="radio" name='cardPayment' id='cardPayment' className='mr-2 w-[24px]'/>Bank</label>
                    </div>
                    <div className='flex'>
                        <img src={bkash} alt="bkash" className='w-[38px] mr-3'/>
                        <img src={visa} alt="visa" className='w-[38px] mr-3'/>
                        <img src={mastercard} alt="mastercard" className='w-[38px] mr-3'/>
                        <img src={nagad} alt="nagad" className='w-[38px] mr-0'/>
                    </div>
                </div>
                <div>
                    <label htmlFor="cashPayment">
                    <input 
                        type="radio" 
                        name="cashPayment" 
                        id="cashPayment" 
                        className='mr-2 w-[24px]'
                    />Cash on delivery</label>
                </div>
                <div className='flex'>
                    <form action="" method="post" className='w-full'>
                        <div className='flex w-full items-center flex-row justify-between'>
                            <input 
                                type="text" 
                                name="couponCode" 
                                id="couponCode" 
                                placeholder='Coupon Code' 
                                className='border border-[#000000] rounded-lg h-[50px] px-3 focus:outline-none md:w-[250px]'/>
                            <button 
                                type='button' 
                                name='applyCouponCode' 
                                id='applyCouponCode' 
                                className='text-white rounded-sm py-3 px-10 bg-[#DB4444]'>
                                Apply Coupon
                            </button>
                        </div>
                    </form>
                </div>
                <div>
                    <button type="button" className='text-white rounded-sm py-3 px-10 bg-[#DB4444]'>Place Order</button>
                </div>
            </div>
        </div>
    </div>

  );
};

export default BillingDetails
import React, {useState, useEffect} from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import CartProduct2 from '../Components/CartProduct2'
import CartHeading from '../Components/CartHeading'

const Cart = ({
    cartSubTotal,
    shippingFee,
    cartTotal
}) => {

    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [errorProducts, setErrorProducts] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoadingProducts(true);
            setErrorProducts(null);
            try {
                const response = await fetch('/flashsales.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                console.error('Failed to fetch Best Selling products:', err);
                setErrorProducts(`Failed to load products: ${err.message}.`);
                setProducts([]);
            } finally {
                setLoadingProducts(false);
            }
        };

        fetchProducts();
    }, []);

  return (
    <div>
        <Navbar/>
        <div>
            <CartHeading/>
            <div>
                {loadingProducts ? (
                        <div className="text-[16px] font-bold text-gray-400 w-full text-center">Loading flash sales products...</div>
                    ) : errorProducts ? (
                        <div className="text-[16px] font-normal text-red-500 w-full text-center">{errorProducts}</div>
                    ) : products.length === 0 ? (
                        <div className="text-[16px] font-normal text-gray-600 w-full text-center">No flash sales active right now. Check back soon!</div>
                    ) : (
                        products.map((item) => (
                        <CartProduct2
                         key={item.id}
                        id={item.id}
                        productName={item.productName}
                        productImage={item.productImage}
                        Price={item.Price}
                        subTotal={item.subTotal}
                        />
                            
                        ))
                    )}
            </div>
            <div className='flex text-[16px] my-10 font-medium justify-between'>
                <a href="/explore-products"><button className='w-[218px] h-[56px] border border-[#000000] rounded-lg hover:bg-[#DB4444] hover:text-white hover:border-none'>
                    Return to Shop
                </button></a>
                <button className='w-[195px] h-[56px] border border-[#000000] rounded-lg hover:bg-[#DB4444] hover:text-white hover:border-none'>
                    Update Cart
                </button>
            </div>
            <div className='my-20 flex justify-between items-start'>
                <form method='post' className='flex items-center space-x-3'>
                    <input placeholder='Coupon Code' type="text" className='w-[300px] h-[56px] focus:outline-none rounded-lg px-4 border border-[#000000]'/>
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
                    <div className='mx-auto'><button className='font-medium w-[260px] h-[56px] bg-[#DB4444] hover:bg-red-600 text-white rounded-lg'>Proceed to Checkout</button></div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Cart
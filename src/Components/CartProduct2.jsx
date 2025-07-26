
import React, { useState, useCallback, useEffect } from 'react';
import { useCart } from '../CartContext';

const CartProduct2 = ({
    id = "",
    productName = "",
    productImage,
    Price = "",
    subTotal = "",
    initialQuantity = 1,
    maxQuantity = 1, 
}) => {
    const { updateQuantity, removeFromCart } = useCart();

    const [inputValue, setInputValue] = useState(String(initialQuantity).padStart(2, '0'));

    useEffect(() => {
      setInputValue(String(initialQuantity).padStart(2, '0'));
    }, [initialQuantity]);

    const handleInputChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value)) {
            
            const clampedValue = Math.max(1, Math.min(value, maxQuantity));
            setInputValue(String(clampedValue).padStart(2, '0'));
            updateQuantity(id, clampedValue); 
        } else if (event.target.value === '') {
            setInputValue(''); 
        }
    };

    const handleBlur = () => {
        let value = parseInt(inputValue, 10);
        if (isNaN(value) || value < 1) {
            value = 1; 
        }
        
        value = Math.min(value, maxQuantity);
        setInputValue(String(value).padStart(2, '0'));
        updateQuantity(id, value);
    };

    const handleDeleteProduct = useCallback(() => {
        removeFromCart(id);
    }, [id, removeFromCart]);

    return (
        <div id={id} className='flex relative mb-10 mt-13 md:flex-row flex-col md:min-w-full space-y-3 py-5 md:py-3 items-center text-[16px] px-7 md:h-[102px] rounded-lg shadow-lg'>
            <button onClick={handleDeleteProduct} className="absolute top-1 left-2 text-[#DB4444] hover:text-red-600 hover:scale-105 text-[25px] font-semibold z-10"
                        >
                            &times;
                        </button>
            <div className='flex md:hidden justify-between w-full font-semibold text-lg'>
                <div>
                    <p>Product</p>
                </div>
                <div>
                    <p>Price</p>
                </div>
            </div>
            <div className='w-full md:w-[60%] flex items-center'>
                <div className='w-[50%] flex items-center'>
                    <img src={productImage} alt="" className='w-[60px] h-[60px] mr-3'/>
                    <p>{productName}</p>
                </div>
                <div className='w-[50%] flex justify-end md:justify-normal'>
                    <p>&#8358;{Price}</p>
                </div>
            </div>
            <div className='flex md:hidden justify-between w-full font-semibold text-lg pt-2'>
                <div>
                    <p>Quantity</p>
                </div>
                <div>
                    <p>Subtotal</p>
                </div>
            </div>
            <div className='w-full md:w-[40%] flex items-center'>
                <div className='w-[50%] md:w-3/4 flex items-center'>
                    <button
                        onClick={() => updateQuantity(id, initialQuantity - 1)}
                        className="w-[30px] h-[44px] border border-gray-300 rounded-l-lg flex items-center justify-center text-xl font-bold"
                        disabled={initialQuantity <= 1}
                    >
                        -
                    </button>
                    <input
                        type="number"
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleBlur} 
                        className="h-[44px] w-[72px] p-1 border-y border-gray-300 text-center text-gray-700
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="01"
                        min="1"
                        max={maxQuantity} 
                    />
                    <button
                        onClick={() => updateQuantity(id, initialQuantity + 1)}
                        className="w-[30px] h-[44px] border border-gray-300 rounded-r-lg flex items-center justify-center text-xl font-bold"
                        disabled={initialQuantity >= maxQuantity}
                    >
                        +
                    </button>
                </div>
                <div className='w-[50%] md:w-1/4 flex justify-end md:justify-normal'>
                    <p>&#8358;{subTotal}</p>
                </div>
            </div>
        </div>
    )
}

export default CartProduct2;
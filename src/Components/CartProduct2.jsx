import React, { useState, useCallback } from 'react'


const CartProduct2 = ({
    id = "",
    productName = "",
    productImage,
    Price = "",
    subTotal = "",
}) => {

    const [isProductOpen, setIsProductOpen] = useState(true);
    const [inputValue, setInputValue] = useState('01');
    const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDeleteProduct = useCallback(() => {
    setIsProductOpen(false);
    console.log(`Product ${id} deleted.`);
  }, [id]);

  return (
    <div>
        {isProductOpen && (
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
                <div className='w-[50%] md:w-3/4 flex'>
                    <input
                        type="number"
                        value={inputValue}
                        onChange={handleInputChange}
                        className="h-[44px] w-[72px] p-1 border border-gray-300 rounded-lg shadow-sm text-center text-gray-700
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="00"
                        min="1"
                        max="99"
                    />
                </div>
                <div className='w-[50%] md:w-1/4 flex justify-end md:justify-normal'>
                    <p>&#8358;{subTotal}</p>
                </div>
            </div>
        </div>
        )}
    </div>
  )
}

export default CartProduct2
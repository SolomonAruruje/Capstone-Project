// CartProduct2.jsx
import React, { useState, useCallback, useEffect } from 'react';
import { useCart } from '../CartContext';

const CartProduct2 = ({
    id = "",
    productName = "",
    productImage,
    Price = 0,
    subTotal = 0,
    initialQuantity = 1,
    maxQuantity = 1,
}) => {
    const { updateQuantity, removeFromCart } = useCart();
    const [inputValue, setInputValue] = useState(String(initialQuantity));

    // Sync inputValue with initialQuantity from props
    useEffect(() => {
        setInputValue(String(initialQuantity));
    }, [initialQuantity]);

    const handleUpdateQuantity = (newQty) => {
        const parsedMaxQuantity = parseInt(maxQuantity, 10);
        const parsedNewQuantity = parseInt(newQty, 10);

        if (isNaN(parsedNewQuantity) || parsedNewQuantity < 1) {
            updateQuantity(id, 1, parsedMaxQuantity);
            return;
        }
        
        // No need for a pop-up here, the UI will update
        // and the user will see the remaining stock
        if (parsedNewQuantity > parsedMaxQuantity) {
             updateQuantity(id, parsedMaxQuantity, parsedMaxQuantity);
             return;
        }

        updateQuantity(id, parsedNewQuantity, parsedMaxQuantity);
    };

    const handleIncrement = () => {
        const currentQty = parseInt(inputValue, 10) || 0;
        const newQty = currentQty + 1;
        handleUpdateQuantity(newQty);
    };

    const handleDecrement = () => {
        const currentQty = parseInt(inputValue, 10) || 0;
        const newQty = currentQty - 1;
        if (newQty >= 1) {
            handleUpdateQuantity(newQty);
        }
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
    };

    const handleBlur = () => {
        let value = parseInt(inputValue, 10);
        if (isNaN(value) || value < 1) {
            value = 1;
        }
        handleUpdateQuantity(value);
    };

    const handleDeleteProduct = useCallback(() => {
        removeFromCart(id);
    }, [id, removeFromCart]);

    const itemsRemaining = maxQuantity - initialQuantity;
    const isOutOfStock = maxQuantity <= 0;
    const isAtLimit = initialQuantity >= maxQuantity;

    return (
        <div id={id} className='flex relative mb-10 mt-13 md:flex-row flex-col md:min-w-full space-y-3 py-5 md:py-3 items-center text-[16px] px-7 md:h-[102px] rounded-lg shadow-lg'>
            <button onClick={handleDeleteProduct} className="absolute top-1 left-2 text-[#DB4444] hover:text-red-600 hover:scale-105 text-[25px] font-semibold z-10">
                &times;
            </button>
            <div className='flex md:hidden justify-between w-full font-semibold text-lg'>
                <div><p>Product</p></div>
                <div><p>Price</p></div>
            </div>
            <div className='w-full md:w-[60%] flex items-center'>
                <div className='w-[50%] flex items-center'>
                    <img src={productImage} alt="" className='w-[60px] h-[60px] mr-3'/>
                    <p>{productName}</p>
                </div>
                <div className='w-[50%] flex justify-end md:justify-normal'>
                    <p>&#8358;{Price.toLocaleString()}</p>
                </div>
            </div>
            <div className='flex md:hidden justify-between w-full font-semibold text-lg pt-2'>
                <div><p>Quantity</p></div>
                <div><p>Subtotal</p></div>
            </div>
            <div className='w-full md:w-[40%] flex items-center'>
                <div className='w-[50%] md:w-3/4 flex flex-col items-center justify-center'>
                    <div className="flex items-center space-x-1 border border-gray-300 rounded-lg">
                        <button
                            onClick={handleDecrement}
                            className="w-[30px] h-[44px] flex items-center justify-center text-xl font-bold text-gray-500 hover:text-black transition"
                            disabled={initialQuantity <= 1}
                        >
                            -
                        </button>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            className="h-[44px] w-[55px] text-center text-gray-700 focus:outline-none"
                            inputMode="numeric"
                        />
                        <button
                            onClick={handleIncrement}
                            className="w-[30px] h-[44px] flex items-center justify-center text-xl font-bold text-gray-500 hover:text-black transition"
                            disabled={isAtLimit}
                        >
                            +
                        </button>
                    </div>
                    <div className="text-sm mt-1 text-center">
                        {isOutOfStock ? (
                            <span className="text-red-500">Out of Stock</span>
                        ) : isAtLimit ? (
                            <span className="text-red-500">At stock limit</span>
                        ) : (
                            <span className="text-gray-500">
                                {itemsRemaining} item{itemsRemaining !== 1 ? 's' : ''} left
                            </span>
                        )}
                    </div>
                </div>
                <div className='w-[50%] md:w-1/4 flex justify-end md:justify-normal'>
                    <p>&#8358;{subTotal.toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}

export default CartProduct2;





























// import React, { useState, useCallback, useEffect } from 'react';
// import { useCart } from '../CartContext';

// const CartProduct2 = ({
//     id = "",
//     productName = "",
//     productImage,
//     Price = 0, // Default to 0, ensure it's a number
//     subTotal = 0, // Default to 0, ensure it's a number
//     initialQuantity = 1, // Default to 1, ensure it's a number
//     maxQuantity = 1, // Default to 1, ensure it's a number
// }) => {
//     const { updateQuantity, removeFromCart } = useCart();

//     // inputValue is a string for display, but its numeric value is handled by updateQuantity
//     const [inputValue, setInputValue] = useState(String(initialQuantity).padStart(2, '0'));

//     useEffect(() => {
//       // Ensure initialQuantity is treated as a number for padding
//       setInputValue(String(parseInt(initialQuantity, 10)).padStart(2, '0'));
//     }, [initialQuantity]);

//     const handleInputChange = (event) => {
//         const value = parseInt(event.target.value, 10);
//         // Only update if it's a valid number or empty string
//         if (!isNaN(value)) {
//             // Pass maxQuantity as a number to updateQuantity
//             const clampedValue = Math.max(1, Math.min(value, parseInt(maxQuantity, 10)));
//             setInputValue(String(clampedValue).padStart(2, '0'));
//             updateQuantity(id, clampedValue, parseInt(maxQuantity, 10)); // Pass maxQuantity to context
//         } else if (event.target.value === '') {
//             setInputValue('');
//         }
//     };

//     const handleBlur = () => {
//         let value = parseInt(inputValue, 10);
//         if (isNaN(value) || value < 1) {
//             value = 1;
//         }
//         // Pass maxQuantity as a number to updateQuantity
//         value = Math.min(value, parseInt(maxQuantity, 10));
//         setInputValue(String(value).padStart(2, '0'));
//         updateQuantity(id, value, parseInt(maxQuantity, 10)); // Pass maxQuantity to context
//     };

//     const handleDeleteProduct = useCallback(() => {
//         removeFromCart(id);
//     }, [id, removeFromCart]);

//     return (
//         <div id={id} className='flex relative mb-10 mt-13 md:flex-row flex-col md:min-w-full space-y-3 py-5 md:py-3 items-center text-[16px] px-7 md:h-[102px] rounded-lg shadow-lg'>
//             <button onClick={handleDeleteProduct} className="absolute top-1 left-2 text-[#DB4444] hover:text-red-600 hover:scale-105 text-[25px] font-semibold z-10"
//                         >
//                             &times;
//                         </button>
//             <div className='flex md:hidden justify-between w-full font-semibold text-lg'>
//                 <div>
//                     <p>Product</p>
//                 </div>
//                 <div>
//                     <p>Price</p>
//                 </div>
//             </div>
//             <div className='w-full md:w-[60%] flex items-center'>
//                 <div className='w-[50%] flex items-center'>
//                     <img src={productImage} alt="" className='w-[60px] h-[60px] mr-3'/>
//                     <p>{productName}</p>
//                 </div>
//                 <div className='w-[50%] flex justify-end md:justify-normal'>
//                     <p>&#8358;{Price.toLocaleString()}</p> {/* Format for display */}
//                 </div>
//             </div>
//             <div className='flex md:hidden justify-between w-full font-semibold text-lg pt-2'>
//                 <div>
//                     <p>Quantity</p>
//                 </div>
//                 <div>
//                     <p>Subtottal</p>
//                 </div>
//             </div>
//             <div className='w-full md:w-[40%] flex items-center'>
//                 <div className='w-[50%] md:w-3/4 flex items-center'>
//                     <button
//                         onClick={() => updateQuantity(id, parseInt(initialQuantity, 10) - 1, parseInt(maxQuantity, 10))} // Pass maxQuantity
//                         className="w-[30px] h-[44px] border border-gray-300 rounded-l-lg flex items-center justify-center text-xl font-bold"
//                         disabled={parseInt(initialQuantity, 10) <= 1}
//                     >
//                         -
//                     </button>
//                     <input
//                         type="number"
//                         value={inputValue}
//                         onChange={handleInputChange}
//                         onBlur={handleBlur}
//                         className="h-[44px] w-[72px] p-1 border-y border-gray-300 text-center text-gray-700
//                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         placeholder="01"
//                         min="1"
//                         max={parseInt(maxQuantity, 10)} // Ensure max attribute is a number
//                     />
//                     <button
//                         onClick={() => updateQuantity(id, parseInt(initialQuantity, 10) + 1, parseInt(maxQuantity, 10))} // Pass maxQuantity
//                         className="w-[30px] h-[44px] border border-gray-300 rounded-r-lg flex items-center justify-center text-xl font-bold"
//                         disabled={parseInt(initialQuantity, 10) >= parseInt(maxQuantity, 10)}
//                     >
//                         +
//                     </button>
//                 </div>
//                 <div className='w-[50%] md:w-1/4 flex justify-end md:justify-normal'>
//                     <p>&#8358;{subTotal.toLocaleString()}</p> {/* Format for display */}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default CartProduct2;


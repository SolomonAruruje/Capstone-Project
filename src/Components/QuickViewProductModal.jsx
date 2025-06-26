// // QuickViewProductModal.jsx
// import React, { useState } from 'react';
// import wishlist from '../assets/wishlist2.svg';
// import Stars from './Stars'; // Ensure this path is correct

// const QuickViewProductModal = ({ product, onClose }) => {
//     // 1. Declare state (Hook) UNCONDITIONALLY at the top level
//     //    Use optional chaining `?.` or a default value (`|| 1`) to safely access initialQuantity
//     const [currentQuantity, setCurrentQuantity] = useState(product?.initialQuantity || 1);

//     const [selectedSize, setSelectedSize] = useState(null);
//     const [selectedColor, setSelectedColor] = useState(null);
//     // 2. Now, you can have your conditional return
//     //    This return statement simply prevents rendering the JSX, but the Hook has already been called.
//     if (!product) return null;

//     // Destructure properties from the single 'product' object (now that we know 'product' is not null)
//     const {
//         id,
//         img1,
//         img2,
//         img3,
//         img4,
//         productImage,
//         discountPercentage = "",
//         colour = "",
//         productName = '',
//         price = "",
//         discountPrice = "",
//         rateno = "",
//         ratingStars,
//         description = "",
//         state = "",
//         productcolour1 = "",
//         productcolour2 = "",
//         productcolour3 = "",
//         size = "Size", // Default for size category
//         sizeA = "XS",
//         sizeB = "S",
//         sizeC = "M",
//         sizeD = "L",
//         sizeE = "XL",
//         sizeF = "XXL",
//         sizeG = "XXXL",
//         // initialQuantity is already destructured implicitly by being passed into the useState hook
//     } = product;


//     // Quantity control functions
//     const handleDecreaseQuantity = () => {
//         setCurrentQuantity(prev => (prev > 1 ? prev - 1 : 1));
//     };

//     const handleIncreaseQuantity = () => {
//         setCurrentQuantity(prev => prev + 1);
//     };

//     const handleSizeSelect = (value) => {
//         setSelectedSize(prevSize => (prevSize === value ? null : value));
//     };

//     const handleColorSelect = (value) => {
//         setSelectedColor(prevColor => (prevColor === value ? null : value));
//     };

//     return (
//         // Modal Overlay
//         <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 p-4 ">
//             {/* Modal Content */}
//             <div className="bg-white rounded-lg shadow-lg relative w-[85%] h-auto object-contain">
//                 {/* Close Button */}
//                 <button
//                     onClick={onClose}
//                     className="absolute top-1 right-2 text-black-600 hover:text-red-600 hover:scale-105 text-3xl font-semibold z-10"
//                 >
//                     &times;
//                 </button>

//                 {/* Product Details Layout */}
//                 <div id={id} className='flex flex-col md:flex-row justify-between items-center max-w-[80%] h-[485px] p-3'>
//                     {/* Small Images Column */}
//                     <div className='flex flex-row md:flex-col space-y-5 justify-between h-[465px] mr-5 items-stretch'>
//                         <div className='w-[100px] h-[100px] flex items-center justify-center bg-[#F5F5F5] rounded-sm overflow-hidden'>
//                             <img src={img1} alt="Product thumbnail 1" className='max-w-[85%] max-h-[85%] object-contain'/>
//                         </div>
//                         <div className='w-[100px] h-[100px] flex items-center justify-center bg-[#F5F5F5] rounded-sm overflow-hidden'>
//                             <img src={img2} alt="Product thumbnail 2" className='max-w-[85%] max-h-[85%] object-contain'/>
//                         </div>
//                         <div className='w-[100px] h-[100px] flex items-center justify-center bg-[#F5F5F5] rounded-sm overflow-hidden'>
//                             <img src={img3} alt="Product thumbnail 3" className='max-w-[85%] max-h-[85%] object-contain'/>
//                         </div>
//                         <div className='w-[100px] h-[100px] flex items-center justify-center bg-[#F5F5F5] rounded-sm overflow-hidden'>
//                             <img src={img4} alt="Product thumbnail 4" className='max-w-[85%] max-h-[85%] object-contain'/>
//                         </div>
//                     </div>

//                     {/* Main Product Image */}
//                     <div className='h-[465px] w-[400px] mr-5 bg-[#F5F5F5] flex items-center justify-center flex-shrink-0 relative rounded-sm'>
//                         <img src={productImage} alt={`Image of ${productName}`} className='max-w-[85%] max-h-[85%] object-contain'/>
//                         {discountPercentage && (
//                             <p className='absolute top-2 left-2 px-3 py-1 text-white rounded text-[12px] font-normal' style={{ backgroundColor: colour }}>{discountPercentage}</p>
//                         )}
//                     </div>

//                     {/* Product Info Column */}
//                     <div className='flex flex-col align-middle md:w-[250px] lg:w-[275px] h-[465px]'>
//                         {/* Product Name, Rating, Price, Description */}
//                         <div className='mb-2 pb-3 border-b border-[#000000]'>
//                             <h4 className='text-[24px] font-semibold mt-3 mb-2'>{productName}</h4>
//                             <div className="flex items-center mb-2">
//                                 <Stars rating={ratingStars} />
//                                 <p className="text-[#000000] text-[14px] ml-2">
//                                     &#40;{rateno} Reviews&#41; | <span className='text-[#00FF66]'>{state}</span>
//                                 </p>
//                             </div>
//                             <p className='text-[24px] text-[#000000] font-normal mb-2'>
//                                 &#8358;{discountPrice}
//                                     <span className='text-gray-700 text-[24px] ml-7 line-through'>{price}</span>
//                             </p>
//                             <p className='text-[14px]/[19px] text-[#000000] text-justify font-normal'>{description}</p>
//                         </div>

//                         {/* Colours */}
//                         { (productcolour1 || productcolour2 || productcolour3) && (
//                             <div className='flex items-center space-x-4 mb-1'>
//                                 <p className="text-[#000000] text-[20px] font-normal">Colours:</p>
//                                 {productcolour1 && (
//                                     <button
//                                         className={`w-[24px] h-[24px] rounded-full border border-gray-300 transition-all duration-200
//                                             ${selectedColor === productcolour1 ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:ring-1 hover:ring-gray-400'}`
//                                         }
//                                         style={{ backgroundColor: productcolour1 }}
//                                         title={productcolour1}
//                                         onClick={() => handleColorSelect(productcolour1)}
//                                     ></button>
//                                 )}
//                                 {productcolour2 && (
//                                     <button
//                                         className={`w-[24px] h-[24px] rounded-full border border-gray-300 transition-all duration-200
//                                             ${selectedColor === productcolour2 ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:ring-1 hover:ring-gray-400'}`
//                                         }
//                                         style={{ backgroundColor: productcolour2 }}
//                                         title={productcolour2}
//                                         onClick={() => handleColorSelect(productcolour2)}
//                                     ></button>
//                                 )}
//                                 {productcolour3 && (
//                                     <button
//                                         className={`w-[24px] h-[24px] rounded-full border border-gray-300 transition-all duration-200
//                                             ${selectedColor === productcolour3 ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:ring-1 hover:ring-gray-400'}`
//                                         }
//                                         style={{ backgroundColor: productcolour3 }}
//                                         title={productcolour3}
//                                         onClick={() => handleColorSelect(productcolour3)}
//                                     ></button>
//                                 )}
//                             </div>
//                         )}

//                         {/* Sizes */}
//                         { (sizeA || sizeB || sizeC || sizeD || sizeE || sizeF || sizeG) && (
//                             <div className='flex flex-col items-start mb-6'>
//                                 <p className="text-[#000000] font-medium">{size}:</p>
//                                 <div className='flex items-center flex-wrap w-[250px] space-x-1'>
//                                 {sizeA && (
//                                     <button
//                                         className={`
//                                             w-[40px] h-[30px] text-[14px] border border-[#000000] rounded-md
//                                             text-[#000000] font-medium hover:bg-red-300 transition-colors duration-200
//                                             ${selectedSize === sizeA ? 'bg-red-500 text-white border-red-500' : ''}
//                                         `}
//                                         onClick={() => handleSizeSelect(sizeA)}
//                                     >
//                                         {sizeA}
//                                     </button>
//                                 )}
//                                 {sizeB && (
//                                     <button
//                                         className={`
//                                             w-[40px] h-[30px] text-[14px] border border-[#000000] rounded-md
//                                             text-[#000000] font-medium hover:bg-red-300 transition-colors duration-200
//                                             ${selectedSize === sizeB ? 'bg-red-500 text-white border-red-500' : ''}
//                                         `}
//                                         onClick={() => handleSizeSelect(sizeB)}
//                                     >
//                                         {sizeB}
//                                     </button>
//                                 )}
//                                 {sizeC && (
//                                     <button
//                                         className={`
//                                             w-[40px] h-[30px] text-[14px] border border-[#000000] rounded-md
//                                             text-[#000000] font-medium hover:bg-red-300 transition-colors duration-200
//                                             ${selectedSize === sizeC ? 'bg-red-500 text-white border-red-500' : ''}
//                                         `}
//                                         onClick={() => handleSizeSelect(sizeC)}
//                                     >
//                                         {sizeC}
//                                     </button>
//                                 )}
//                                 {sizeD && (
//                                     <button
//                                         className={`
//                                             w-[40px] h-[30px] text-[14px] border border-[#000000] rounded-md
//                                             text-[#000000] font-medium hover:bg-red-300 transition-colors duration-200
//                                             ${selectedSize === sizeD ? 'bg-red-500 text-white border-red-500' : ''}
//                                         `}
//                                         onClick={() => handleSizeSelect(sizeD)}
//                                     >
//                                         {sizeD}
//                                     </button>
//                                 )}
//                                 {sizeE && (
//                                     <button
//                                         className={`
//                                             w-[40px] h-[30px] text-[14px] border border-[#000000] rounded-md
//                                             text-[#000000] font-medium hover:bg-red-300 transition-colors duration-200
//                                             ${selectedSize === sizeE ? 'bg-red-500 text-white border-red-500' : ''}
//                                         `}
//                                         onClick={() => handleSizeSelect(sizeE)}
//                                     >
//                                         {sizeE}
//                                     </button>
//                                 )}
//                                 {sizeF && (
//                                     <button
//                                         className={`
//                                             w-[40px] h-[30px] text-[14px] border border-[#000000] rounded-md
//                                             text-[#000000] font-medium hover:bg-red-300 transition-colors duration-200
//                                             ${selectedSize === sizeF ? 'bg-red-500 text-white border-red-500' : ''}
//                                         `}
//                                         onClick={() => handleSizeSelect(sizeF)}
//                                     >
//                                         {sizeF}
//                                     </button>
//                                 )}
//                                 {sizeG && (
//                                     <button
//                                         className={`
//                                             w-[40px] h-[30px] text-[14px] border border-[#000000] rounded-md
//                                             text-[#000000] font-medium hover:bg-red-300 transition-colors duration-200
//                                             ${selectedSize === sizeG ? 'bg-red-500 text-white border-red-500' : ''}
//                                         `}
//                                         onClick={() => handleSizeSelect(sizeG)}
//                                     >
//                                         {sizeG}
//                                     </button>
//                                 )}
//                                 </div>
//                             </div>
//                         )}

//                         {/* Quantity, Add to Cart, Wishlist Button */}
//                         <div className='flex items-center space-x-2'>
//                             <div className='flex rounded'>
//                                 <button
//                                     onClick={handleDecreaseQuantity}
//                                     className='w-[30px] h-[40px] border border-[#000000] text-[#000000] text-[14px] hover:bg-red-600 hover:text-white text-center rounded-l'
//                                 >
//                                     -
//                                 </button>
//                                 <input
//                                     type="text"
//                                     readOnly
//                                     className='w-[55px] h-[40px] border border-[#000000] text-center text-[14px] font-medium appearance-none outline-none'
//                                     value={currentQuantity}
//                                 />
//                                 <button
//                                     onClick={handleIncreaseQuantity}
//                                     className='w-[30px] h-[40px] border border-[#000000] text-[#000000] text-[14px] hover:bg-red-600 hover:text-white text-center rounded-r'
//                                 >
//                                     +
//                                 </button>
//                             </div>
//                             <button className='bg-[#DB4444] text-white w-[165px] h-[40px] rounded text-[14px] font-medium hover:bg-red-600 transition-colors'>
//                                 Add To Cart
//                             </button>
//                             <button className='w-[45px] h-[40px] rounded border border-gray-400 flex items-center justify-center hover:bg-gray-100'>
//                                 <img src={wishlist} alt="Add to Wishlist" className='w-6 h-6 object-contain'/>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default QuickViewProductModal;

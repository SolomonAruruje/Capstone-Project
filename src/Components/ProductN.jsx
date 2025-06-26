// src/components/Product.jsx
import React from 'react';
import wishlist from '../assets/wishlist2.svg';
import quickViewIcon from '../assets/quickview.svg';
import Stars from './Stars';
import { useQuickView } from './QuickViewContext'; // Import the custom hook

const Product = ({
    id,
    discountPercentage = "",
    colour = "",
    productName = '',
    price = "",
    discountPrice = "",
    productImage,
    rateno = "",
    rating,
    description = "", // Ensure all details for modal are here
    state = "",
    img1, img2, img3, img4,
    productcolour1 = "", productcolour2 = "", productcolour3 = "",
    size = "", sizeA = "", sizeB = "", sizeC = "", sizeD = "", sizeE = "", sizeF = "", sizeG = "",
    quantity = 1,
}) => {
    const { openQuickView } = useQuickView(); // Use the hook to get the openQuickView function

    // Collect ALL relevant product data for the Quick View modal
    const productData = {
        id,
        discountPercentage,
        colour,
        productName,
        price,
        discountPrice,
        productImage,
        rateno,
        rating,
        description,
        state,
        img1, img2, img3, img4,
        productcolour1, productcolour2, productcolour3,
        size, sizeA, sizeB, sizeC, sizeD, sizeE, sizeF, sizeG,
        initialQuantity: quantity,
    };

    return (
        <div className=''>
            <div className='flex flex-col mr-4 w-[250px] lg:w-[270px] flex-shrink-0 mb-5' id={id}>
                <div className='items-center flex group overflow-hidden cursor-pointer gap-5  bg-[#F5F5F5] relative rounded-sm p-5 w-[250px] lg:w-[270px] h-[250px] '>
                    <img src={productImage} alt={`Image of ${productName}`} className='absolute w-[172px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/>
                    <button className='h-[41px] text-white text-[16px] font-medium opacity-100 w-full bottom-0 left-0 right-0 transition-opacity duration-300 pointer-events-auto absolute lg:opacity-0 lg:pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto bg-[#000000]'>Add To Cart</button>
                    <p className='absolute top-2 left-2 px-2 py-1 text-white rounded text-[12px] font-normal' style={{ backgroundColor: colour }}>{discountPercentage}</p>
                    <div className='flex flex-col space-y-2 absolute right-2 top-2 items-center'>
                        <button><img src={wishlist} alt="Add to Wishlist" className='rounded-xl w-[34px]' /></button>
                        {/* Call openQuickView from the context */}
                        <button onClick={() => openQuickView(productData)}>
                            <img src={quickViewIcon} alt="Quick View" className='hidden md:flex rounded-xl w-[34px]' />
                        </button>
                    </div>
                </div>
                <div>
                    <div className='flex flex-col items-start space-y-1'>
                        <h4 className='text-[16px] font-semibold'>{productName}</h4>
                        <span className="flex items-center space-x-[-2px]">
                            <Stars rating={rating} />
                            <span className="text-[#000000] text-[14px] font-semibold ml-2">&#40;{rateno}&#41;</span>
                        </span>
                        <p className='text-[16px] text-[#DB4444] font-medium'>&#8358;{discountPrice} <span className='text-[#000000] ml-3 line-through'>{price}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
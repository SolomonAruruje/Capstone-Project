import React from 'react';
import wishlist from '../assets/wishlist2.svg';
import quickView from '../assets/quickview.svg';
import Stars from './Stars';

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
}) => {
  return (
    <div className=''>
        <div className='flex flex-col mr-4 w-[250px] lg:w-[270px] flex-shrink-0 mb-5' id={id}>
            <div className='items-center flex group overflow-hidden cursor-pointer gap-5  bg-[#F5F5F5] relative rounded-sm p-5 w-[250px] lg:w-[270px] h-[250px] '>
                <img src={productImage} alt={`Image of ${productName}`} className='absolute w-[172px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/>
                <button className='h-[41px] text-white text-[16px] font-medium opacity-100 w-full bottom-0 left-0 right-0 transition-opacity duration-300 pointer-events-auto absolute lg:opacity-0 lg:pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto bg-[#000000]'>Add To Cart</button>
                <p className='absolute top-2 left-2 px-2 py-1 text-white rounded text-[12px] font-normal' style={{ backgroundColor: colour }}>{discountPercentage}</p>
                <div className='flex flex-col space-y-2 absolute right-2 top-2 items-center'>
                    <button><img src={wishlist} alt="Add to Wishlist" className='rounded-xl w-[34px]' /></button>
                    <button><img src={quickView} alt="Quick View" className='rounded-xl w-[34px]' /></button>
                </div>
            </div>
            <div>
                <h4 className='text-[16px] font-semibold'>{productName}</h4>
                <p className='text-[16px] text-[#DB4444] font-medium'>&#8358;{discountPrice} <span className='text-[#000000] ml-3 line-through'>{price}</span></p>
                <div className="flex items-center space-x-[-2px]">
                    <Stars rating={rating} />
                    <span className="text-[#000000] text-[14px] font-semibold ml-2">{rateno}</span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Product;
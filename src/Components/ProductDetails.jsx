import React from 'react'
import quickView from '../assets/quickview.svg';
import iconDelivery from '../assets/icon-delivery.svg';
import iconReturn from '../assets/icon-return.svg';
import Stars from './Stars';


const ProductDetails = (
    {
    id,
    img1,
    img2,
    img3,
    img4,
    productImage,
    discountPercentage = "",
    colour = "",
    productName = '',
    price = "",
    discountPrice = "",
    rateno = "",
    rating,
    description = "",
    state = "",
    productcolour1 = "",
    productcolour2 = "",
    productcolour3 = "",
    size = "",
    sizeA = "",
    sizeB = "",
    sizeC = "",
    sizeD = "",
    sizeE = "",
    sizeF = "",
    sizeG = "",
    quantity = 1,
}
) => {
  return (
    <div>
        <div id={id} className='flex flex-col md:flex-row justify-between items-center bg-white w-full h-[610px]'>
            <div className='flex flex-col bg-[F5F5F5] justify-between items-center'>
                <div className='w-[170px] h-[138px] items-center'>
                    <img src={img1} alt="" className='w-[121px]'/>
                </div>
                <div className='w-[170px] h-[138px] items-center'>
                    <img src={img2} alt="" className='w-[121px]'/>
                </div>
                <div className='w-[170px] h-[138px] items-center'>
                    <img src={img3} alt="" className='w-[121px]'/>
                </div>
                <div className='w-[170px] h-[138px] items-center'>
                    <img src={img4} alt="" className='w-[121px]'/>
                </div>
            </div>
            <div className='w-[] h-[600] items-center relative'>
                <img src={productImage} alt="" className='w-[446px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/>
                <p className='absolute top-2 left-2 px-2 py-1 text-white rounded text-[12px] font-normal' style={{ backgroundColor: colour }}>{discountPercentage}</p>
            </div>
            <div>
                <div>
                    <h4 className='text-[24px]/[24PX] font-semibold'>{productName}</h4>
                    <div className="flex">
                        <Stars rating={rating} />
                        <p className="text-[#000000] text-[14px]/[21px] font-normal ml-2">&#40;{rateno} Reviews&#41; |<span className='text-[#00FF66]'>{state}</span></p>
                    </div>
                    <p className='text-[24px]/[24PX] text-[#DB4444] font-normal'>&#8358;{discountPrice} <span className='text-[#000000] ml-3 line-through'>{price}</span></p>
                    <p className='text-[14px] text-[#000000] font-normal'>{description}</p>
                </div>
                <div className='flex flex-col space-y-3'>
                    <span className='flex space-x-2'>
                        <p>Colours</p>
                        <button className='text-transparent w-[20px] rounded-xl text-[2px] mr-3' style={{ backgroundColor: productcolour1 }}>d</button>
                        <button className='text-transparent w-[20px] rounded-xl text-[2px] mr-3' style={{ backgroundColor: productcolour2 }}>d</button>
                        <button className='text-transparent w-[20px] rounded-xl text-[2px] mr-3' style={{ backgroundColor: productcolour3 }}>d</button>
                    </span>
                    <span className='flex space-x-2'>
                        <p>{size}</p>
                        <button className='text-transparent w-[30px] border border-[#000000] rounded-lg text-[14px] mr-1.5'>{sizeA}</button>
                        <button className='text-transparent w-[30px] border border-[#000000] rounded-lg text-[14px] mr-1.5'>{sizeB}</button>
                        <button className='text-transparent w-[30px] border border-[#000000] rounded-lg text-[14px] mr-1.5'>{sizeC}</button>
                        <button className='text-transparent w-[30px] border border-[#000000] rounded-lg text-[14px] mr-1.5'>{sizeD}</button>
                        <button className='text-transparent w-[30px] border border-[#000000] rounded-lg text-[14px] mr-1.5'>{sizeE}</button>
                        <button className='text-transparent w-[33px] border border-[#000000] rounded-lg text-[14px] mr-1.5'>{sizeF}</button>
                        <button className='text-transparent w-[35px] border border-[#000000] rounded-lg text-[14px] mr-1.5'>{sizeG}</button>
                    </span>
                    <span className='flex'>
                        <div>
                        <button className='text-white w-[40px] h-[44px] border border-[#000000] rounded-lg text-[16px]'>-</button>
                        <input type="number" className='w-[65px] border border-[#000000] rounded-lg text-[16px]' value={quantity} />
                        <button className='text-white w-[40px] h-[44px] border border-[#000000] rounded-lg text-[16px]'>+</button>
                        </div>
                        <button className='bg-[#DB4444] text-white w-[165px] h-[44px] rounded text-[14px]'>Add To Cart</button>
                        <button className='w-[40px] h-[44px] rounded border border-[#000000]'><img src={quickView} alt="wish" /></button>
                    </span>
                </div>
                <div>
                    <div className='flex space-x-3 h-[90px] border border-[#000000] rounded'>
                        <img src={iconDelivery} alt="" className='w-[40px]'/>
                        <div>
                            <p className='text-[16px] font-medium'>Delivery</p>
                            <p className='text-[12px] font-medium'>Enter your postal code for Delivery Availability</p>
                        </div>
                    </div>
                    <div className='flex space-x-3 h-[90px] border border-[#000000] rounded'>
                        <img src={iconReturn} alt="" className='w-[40px]'/>
                        <div>
                            <p className='text-[16px] font-medium'>Return Delivery</p>
                            <p className='text-[12px] font-medium'>Free 30 Days Delivery Returns. <a href="" className='text-underline'>Details</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductDetails
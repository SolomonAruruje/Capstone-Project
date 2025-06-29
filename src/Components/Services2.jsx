import React from 'react'
import productsale from '../assets/product-sale.svg'
import activecustomer from '../assets/active-customer.svg'
import moneybag from '../assets/moneybag.svg'
import sellers from '../assets/sellers.svg'


const Services2 = () => {
  return (
    <div className='flex flex-col space-y-5 md:space-y-0 md:flex-row items-center justify-between my-25'>
        <div className='flex flex-col py-7 items-center space-y-4 rounded border border-[#000000] w-[70%] md:w-[22%]'>
            <img src={sellers} alt="" className='w-[80px]'/>
            <h4 className='text-[#000000] text-[32px]/[30px] font-bold'>10.5k</h4>
            <p className='text-[16px]/[24px] text-[#000000]'>Sellers active on our site</p>
        </div>
        <div className='flex flex-col py-7 items-center space-y-4 rounded border border-[#000000] bg-[#DB4444] w-[70%] md:w-[22%]'>
            <img src={productsale} alt="" className='w-[80px]'/>
            <h4 className='text-white text-[32px]/[30px] font-bold'>33k</h4>
            <p className='text-[16px]/[24px] text-white'>Monthly Produduct Sale</p>
        </div>
        <div className='flex flex-col py-7 items-center space-y-4 rounded border border-[#000000] w-[70%] md:w-[22%]'>
            <img src={activecustomer} alt="" className='w-[80px]'/>
            <h4 className='text-[#000000] text-[32px]/[30px] font-bold'>45.5k</h4>
            <p className='text-[16px]/[24px] text-[#000000]'>Customers active on our site</p>
        </div>
        <div className='flex flex-col py-7 items-center space-y-4 rounded border border-[#000000] w-[70%] md:w-[22%]'>
            <img src={moneybag} alt="" className='w-[80px]'/>
            <h4 className='text-[#000000] text-[32px]/[30px] font-bold'>25k</h4>
            <p className='text-[16px]/[24px] text-[#000000]'>Anual gross sale in our site</p>
        </div>
    </div>
  )
}

export default Services2
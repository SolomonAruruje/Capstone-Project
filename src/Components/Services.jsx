import React from 'react'
import delivery from '../assets/delivery-icon.svg'
import customer from '../assets/customer-service.svg'
import guarantee from '../assets/guarantee.svg'

const Services = () => {
  return (
    <div>
        <div className='flex flex-col md:flex-row items-center justify-between my-25 w-[80%] justify-self-center'>
            <div className='flex flex-col items-center justify-center space-y-2 mb-7 md:mb-0'>
                <img src={delivery} alt="" className='w-[]'/>
                <p className='text-[20px]/[28px] font-semibold'>FREE AND FAST DELIVERY</p>
                <p className='text-[14px]/[21px] font-normal'>Free delivery for all orders over $140</p>
            </div>
            <div className='flex flex-col items-center justify-center space-y-2 mb-7 md:mb-0'>
                 <img src={customer} alt="" className='w-[]'/>
                <p className='text-[20px]/[28px] font-semibold'>24/7 CUSTOMER SERVICE</p>
                <p className='text-[14px]/[21px] font-normal'>Friendly 24/7 customer support</p>
            </div>
            <div className='flex flex-col items-center justify-center space-y-2'>
                <img src={guarantee} alt="" className='w-[]'/>
                <p className='text-[20px]/[28px] font-semibold'>MONEY BACK GUARANTEE</p>
                <p className='text-[14px]/[21px] font-normal'>We return money within 30 days</p>
            </div>
        </div>
    </div>
  )
}

export default Services
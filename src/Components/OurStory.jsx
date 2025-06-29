import React from 'react'
import sideimage from '../assets/side2.svg'

const OurStory = () => {
  return (
    <div className='flex flex-col md:flex-row my-30 items-center'>
        <div className='flex md:w-1/2 items-center'>
            <div className='w-[90%] space-y-7 pl-10 mb-2.5'>
                <h1 className='text-[54px]/[64px] font-semibold'>Our Story</h1>
                <p className='text-[16px]/[26px] font-normal'>Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. </p>
                <p className='text-[16px]/[26px] font-normal'>Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.</p>
            </div>
        </div>
        <div className='flex md:w-1/2'>
            <img src={sideimage} alt="" />
        </div>
    </div>
  )
}

export default OurStory
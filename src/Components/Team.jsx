import React from 'react'
import linkedin from '../assets/Icon-Linkedin2.svg'
import twitter from '../assets/Icon-Twitter2.svg'
import instagram from '../assets/Icon-Instagram2.svg'
import image46 from '../assets/image46.svg'
import image51 from '../assets/image51.svg'
import image47 from '../assets/image47.svg'

const Team = () => {
  return (
    <div className='flex flex-col md:flex-row items-center space-y-15 md:space-y-0 justify-between my-25'>
        <div className='w-[85%] md:w-[32%]'>
            <div className='relative h-[430px] rounded bg-[#f5f5f5]'>
                <img src={image46} alt="" className='absolute left-1/2 h-[90%] -translate-x-1/2 bottom-0 max-w-[90%]'/>
            </div>
            <div className='flex flex-col space-y-2'>
                <h3 className='text-[32px] font-medium'>Tom Cruise</h3>
                <p className='text-[16px] font-normal'>Founder & Chairman</p>
                <div className='space-x-3 flex'>
                    <img src={twitter} alt="" /><img src={instagram} alt="" /><img src={linkedin} alt="" />
                </div>
            </div>
        </div>
 
        <div className='w-[85%] md:w-[32%]'>
            <div className='relative h-[430px] rounded bg-[#f5f5f5]'>
                <img src={image51} alt="" className='absolute left-1/2 h-[90%] -translate-x-1/2 bottom-0 max-w-[90%]'/>
            </div>
            <div className='flex flex-col space-y-2'>
                <h3 className='text-[32px] font-medium'>Emma Watson</h3>
                <p className='text-[16px] font-normal'>Managing Director</p>
                <div className='space-x-3 flex'>
                    <img src={twitter} alt="" /><img src={instagram} alt="" /><img src={linkedin} alt="" />
                </div>
            </div>
        </div>

        <div className='w-[85%] md:w-[32%]'>
            <div className='relative h-[430px] rounded bg-[#f5f5f5]'>
                <img src={image47} alt="" className='absolute left-1/2 h-[90%] -translate-x-1/2 bottom-0 max-w-[90%]'/>
            </div>
            <div className='flex flex-col space-y-2'>
                <h3 className='text-[32px] font-medium'>Will Smith</h3>
                <p className='text-[16px] font-normal'>Product Designer</p>
                <div className='space-x-3 flex'>
                    <img src={twitter} alt="" /><img src={instagram} alt="" /><img src={linkedin} alt="" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Team
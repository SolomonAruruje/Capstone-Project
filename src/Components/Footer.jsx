import React from 'react'
import Logo from '../assets/EasyCart_nobg.png'
import sendIcon from '../assets/iconsend.svg'
import instagram from '../assets/icon-instagram.svg'
import facebook from '../assets/icon-facebook.svg'
import linkedin from '../assets/icon-linkedin.svg'
import twitter from '../assets/icon-twitter.svg'
import gplay from '../assets/GooglePlay.svg'
import appstore from '../assets/AppStore.svg'
import qrcode from '../assets/Qrcode 1.svg'

const Footer = () => {
  return (
    <div>
      <footer className='text-white bg-[#000000] md:flex flex-wrap flex-col md:px-3'>
            <div className='flex flex-wrap gap-4 md:gap-0 text-[16px] justify-self-center font-normal lg:flex-row  p-10 m-3'>
                <div className='w-full md:w-1/3 lg:w-1/5 flex-wrap'>
                  <a href='/' className='flex items-center mb-2.5'>
                      <img src={Logo} width={36} alt="" className='mr-2'/>
                      <h3 className='text-[24px] font-bold'>EasyCart</h3>
                  </a>
                  <div className=' mb-2.5 text-[20px] font-medium'>
                      <p>Subscribe</p>
                  </div>
                  <div className=''>
                      <p className='mb-1.5'>Get 10% off your first order</p>
                      <form action="" method="post" className='bg-[#000000] text-white items-center flex justify-around rounded h-[40px] w-[210px] border border-white'>
                          <input type="email" placeholder='Enter your email' className='text-white w-[150px] focus:outline-none' />
                          <button type="submit" className=''><img src={sendIcon} alt="" /></button>
                      </form>
                  </div>
                </div>
                <div className='flex flex-col mt-4 md:mt-0 w-full md:w-1/3 lg:w-1/5 flex-wrap'>
                  <p className='mb-3 text-[20px] font-medium'>Support</p>
                  <p className='mb-2'>Ikeja, Lagos, <br/>Nigeria.</p>
                  <a className='mb-2' href='mailto:contact@easycart.com'>contact@easycart.com</a>
                  <a className='mb-2' href='tel:+2349156503496'>09156503496</a>
                </div>
                <div className='flex flex-col mt-4 md:mt-0 w-full md:w-1/3 lg:w-1/5 flex-wrap'>
                  <a href='' className='mb-3 text-[20px] font-medium'>Account</a>
                  <a href='' className='mb-2'>My Account</a>
                  <a href='' className='mb-2'>Login / Register</a>
                  <a href='' className='mb-2'>Cart</a>
                  <a href='' className='mb-2'>Wishlist</a>
                  <a href='' className='mb-2'>Shop</a>
                </div>
                <div className='flex flex-col mt-4 md:mt-0 w-full md:w-1/3 lg:w-1/5 flex-wrap'>
                    <a href='' className='mb-3 text-[20px] font-medium'>Quick Link</a>
                    <a href='' className='mb-2'>Privacy Policy</a>
                    <a href='' className='mb-2'>Terms of </a>
                    <a href='' className='mb-2'>FAQ</a>
                    <a href='' className='mb-2'>Contact</a>
                </div>
                <div className='flex flex-col mt-4 md:mt-0 w-full md:w-1/3 lg:w-1/5 flex-wrap'>
                  <p className='mb-3 text-[20px] font-medium'>
                      Download App
                  </p>
                  <div className='mb-2'>
                      <p className='text-[12px] mb-1'>Save $3 with App New User Only</p>
                      <div className='flex items-center'>
                        <div>
                          <img src={qrcode} alt="" />
                        </div>
                        <div>
                        <img src={gplay} alt="" />
                        <img src={appstore} alt="" />
                        </div>
                      </div>
                  </div>
                  <div className='flex'>
                    <a href="">
                    <img src={facebook} alt="" className='mr-3.5'/>
                    </a>
                    <a href="">
                    <img src={instagram} alt="" className='mr-3.5'/>
                    </a>
                    <a href="">
                    <img src={twitter} alt="" className='mr-3.5'/>
                    </a>
                    <a href="">
                    <img src={linkedin} alt="" className=''/>
                    </a>
                  </div>
                </div>
            </div>
            <div>
                <p className='md:text-[16px] text-[12px] text-center py-5 border-t border-t-white'>&copy; Copyright Rimel 2022. All right reserved</p>
            </div>
      </footer>
      

    </div>
  )
}

export default Footer
import React, { useState } from 'react'
import Logo from '../assets/EasyCart_nobg.png'
import Responsive from '../assets/responsive.svg'
import Search from '../assets/Vector.svg'
import cart from '../assets/Cart1.svg'
import wishlist from '../assets/Wishlist.svg'

const Navbar = () => {
     const [mobile, setMobile] = useState(false)

  return (
        <nav>
      <div className="hidden md:flex justify-between justify-items-stretch md:px-7 md:pt-8 md:pb-3 border-b border-gray-300">
        <div className="flex hover:scale-115 items-center gap-2">
        <a href="">
            <img src={Logo} width={36} />
        </a>
          <h3 className="text-2xl font-bold">
            <a href="/">
                EasyCart
            </a>
          </h3>
        </div>
        <div className="flex items-center gap-5 text-lg text-[#000000]">
            <h5 className="hover:scale-115 hover:text-shadow-lg/20 text-[16px] font-normal mr-4">
                    <a href="/">
                        Home
                    </a>
                </h5>
                <h5 className="hover:scale-115 hover:text-shadow-lg/20 text-[16px] font-normal mr-4">
                    <a href="/Contact">
                        Contact
                    </a>
                </h5>
                <h5 className="hover:scale-115 hover:text-shadow-lg/20 text-[16px] font-normal mr-4">
                    <a href="/About">
                        About
                    </a>
                </h5>
                <h5 className="hover:scale-115 hover:text-shadow-lg/20 text-[16px] font-normal mr-4">
                    <a href="/SignUp">
                        Sign Up
                    </a>
                </h5>
                <h5 className="hover:scale-115 hover:text-shadow-lg/20 text-[16px] font-normal">
                    <a href="/LogIn">
                        Log In
                    </a>
                </h5>
        </div>
        <div className="flex items-center text-lg justify-items-end">
            <form className='hover:shadow bg-[#F5F5F5] mr-2 w-[243px] py-1.5 px-2 rounded text-[12px] font-normal items-center flex'>
              <input type='search' placeholder='What are you looking for?' className='w-[243px] focus:outline-none'></input>
                <button type='submit'>
                    <img src={Search} alt="" />
                </button>
            </form>
            <div className='flex flex-row '>
                <a href="#" className='mx-2.5'>
                    <img src={wishlist} className="hover:scale-115"></img>
                </a>
                <a href="#" className=''>
                    <img src={cart} className="hover:scale-115"></img>
                </a>
            </div>
        </div>
      </div>

      <div className="flex md:hidden justify-between my-5">
        <div className="flex items-center">
            <a href="">
                <button type='button'>
                    <img src={Logo} width={36} />
                </button>
            </a>
          <h5 className="text-2xl font-semibold">
            <a href="/">
                EasyCart
            </a>
          </h5>
        </div>

        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={() => setMobile(!mobile)}
        >
          <span className="sr-only">Open main menu</span>
            <img src={Responsive} alt="responsive image"/>
        </button>
      </div>

       {mobile &&  <>
            <div className='block md:hidden text-lg text-[#4F5665]'>
                <h5 className="mb-2.5 hover:scale-115 hover:text-shadow-lg/20 text-[16px] font-normal mr-4">
                    <a href="/">
                        Home
                    </a>
                </h5>
                <h5 className="mb-2.5 hover:scale-115 hover:text-shadow-lg/20 text-[16px] font-normal mr-4">
                    <a href="/Contact">
                        Contact
                    </a>
                </h5>
                <h5 className="mb-2.5 hover:scale-115 hover:text-shadow-lg/20 text-[16px] font-normal mr-4">
                    <a href="/About">
                        About
                    </a>
                </h5>
                <h5 className="mb-2.5 hover:scale-115 hover:text-shadow-lg/20 text-[16px] font-normal mr-4">
                    <a href="/SignUp">
                        Sign Up
                    </a>
                </h5>
                <h5 className="mb-2.5 hover:scale-115 hover:text-shadow-lg/20 text-[16px] font-normal">
                    <a href="/LogIn">
                        Log In
                    </a>
                </h5>
            </div>
            <div className="flex flex-col md:hidden text-lg justify-items-end">
            <form className='mb-2.5 hover:shadow bg-[#F5F5F5] mr-2 w-[243px] py-1.5 px-2 rounded text-[12px] font-normal items-center flex'>
              <input type='search' placeholder='What are you looking for?' className='w-[243px] focus:outline-none'></input>
                <button type='submit'>
                    <img src={Search} alt="" />
                </button>
            </form>
            <div className='flex flex-row '>
                <a href="#" className='mx-2.5'>
                    <img src={wishlist} className="hover:scale-115"></img>
                </a>
                <a href="#" className=''>
                    <img src={cart} className="hover:scale-115"></img>
                </a>
            </div>
            </div>
        </>}
    </nav>
  )
}

export default Navbar
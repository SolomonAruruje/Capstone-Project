import React, { useState } from 'react';
import Logo from '../assets/EasyCart_nobg.png';
import Responsive from '../assets/responsive.svg';
import Search from '../assets/Vector.svg';
import cart from '../assets/Cart1.svg';
import wishlist from '../assets/Wishlist.svg';
import { Link } from 'react-router-dom';
import userIcon from '../assets/user.svg';
import { useAuth } from '../AuthContext';

const Navbar = () => {
    const [mobile, setMobile] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const { isLoggedIn, logout, user } = useAuth();


    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };


    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);

    };

    return (
        <nav className='border-b border-gray-300'>
            <div className="hidden md:flex justify-between items-center md:px-7 md:pt-8 md:pb-3 ">
                <div className="flex hover:scale-115 items-center gap-2">
                    <Link to="/">
                        <img src={Logo} width={36} alt="EasyCart Logo" />
                    </Link>
                    <h3 className="text-2xl font-bold">
                        <Link to="/">EasyCart</Link>
                    </h3>
                </div>
                <div className="flex items-center gap-0 xl:gap-5 text-lg text-[#000000]">
                    <h5 className="hover:scale-115 hover:text-shadow-lg/20 text-[16px] font-normal lg:mr-4">
                        <Link to="/">Home</Link>
                    </h5>
                    <h5 className="hover:scale-115 hover:text-shadow-lg/20 text-[16px] font-normal lg:mr-4">
                        <Link to="/Contact">Contact</Link>
                    </h5>
                    <h5 className="hover:scale-115 hover:text-shadow-lg/20 text-[16px] font-normal lg:mr-4">
                        <Link to="/About">About</Link>
                    </h5>

                    {!isLoggedIn ? (
                        <>
                            <h5 className="hover:scale-115 hover:text-shadow-lg/20 text-[16px] font-normal lg:mr-4">
                                <Link to="/SignUp">Sign Up</Link>
                            </h5>
                            <h5 className="hover:scale-115 hover:text-shadow-lg/20 text-[16px] font-normal">
                                <Link to="/LogIn">Log In</Link>
                            </h5>
                        </>
                    ) : (
                        null
                    )}
                </div>
                <div className="flex items-center text-lg justify-items-end">
                    <form className='hover:shadow bg-[#F5F5F5] mr-1.5 w-[243px] py-1.5 px-2 rounded text-[12px] font-normal items-center flex'>
                        <input name='searchBar' type='search' placeholder='What are you looking for?' className='w-[243px] focus:outline-none' />
                        <button type='submit'>
                            <img src={Search} alt="Search Icon" />
                        </button>
                    </form>
                    <div className='flex flex-row '>
                        <Link to="/wishlist" className='mr-1.5'>
                            <img src={wishlist} className="hover:scale-115" alt="Wishlist" />
                        </Link>
                        <Link to="/cart" className='mr-1.5'>
                            <img src={cart} className="hover:scale-115" alt="Cart" />
                        </Link>

                        {isLoggedIn && (
                            <div className='relative mr-1.5'>
                                <button onClick={toggleDropdown} className="focus:outline-none">
                                    {user && user.profilePicture ? (
                                        <img src={user.profilePicture} className="w-[32px] h-[32px] rounded-full object-cover" alt="User Profile" />
                                    ) : (
                                        <img src={userIcon} className="w-[32px]" alt="User Icon" />
                                    )}
                                </button>

                                {isDropdownOpen && (
                                    <div className='absolute right-0 mt-2 w-48 bg-[#0000000A] backdrop-blur-xl rounded-md shadow-lg z-50 overflow-hidden'>
                                        <Link to="/account/manage" className="flex items-center px-4 py-2 text-white text-[14px]/[21px] font-normal hover:text-shadow-lg/20 hover:scale-108" onClick={() => setIsDropdownOpen(false)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Manage My Account
                                        </Link>
                                        <Link to="/Cart" className="flex items-center px-4 py-2 text-white text-[14px]/[21px] font-normal hover:text-shadow-lg/20 hover:scale-108" onClick={() => setIsDropdownOpen(false)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M17 12h.01" />
                                            </svg>
                                            My Order
                                        </Link>
                                        <Link to="/Cancellations" className="flex items-center px-4 py-2 text-white text-[14px]/[21px] font-normal hover:text-shadow-lg/20 hover:scale-108" onClick={() => setIsDropdownOpen(false)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            My Cancellations
                                        </Link>
                                        <Link to="/account/reviews" className="flex items-center px-4 py-2 text-white text-[14px]/[21px] font-normal hover:text-shadow-lg/20 hover:scale-108" onClick={() => setIsDropdownOpen(false)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.519 4.674c.3.921-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.519-4.674a1 1 0 00-.363-1.118L2.928 8.093c-.783-.57-.381-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z" />
                                            </svg>
                                            My Reviews
                                        </Link>
                                        <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-left text-white text-[14px]/[21px] font-normal hover:text-shadow-lg/20 hover:scale-108">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H5a3 3 0 01-3-3v-5a3 3 0 013-3h3m2-3V7a3 3 0 00-3-3H5a3 3 0 00-3 3v5a3 3 0 003 3h3" />
                                            </svg>
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>


            {/* Mobile Navigation */}
            <div className="flex md:hidden justify-between my-5 px-4">
                <div className="flex items-center">
                    <Link to="/">
                        <button type='button'>
                            <img src={Logo} width={36} alt="EasyCart Logo" />
                        </button>
                    </Link>
                    <h5 className="text-2xl font-semibold">
                        <Link to="/">EasyCart</Link>
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
                    <img src={Responsive} alt="responsive image" />
                </button>
            </div>


            {mobile && (
                <>
                    <div className='block md:hidden text-lg text-[#4F5665] px-7 pb-3'>
                        <h5 className="mb-2.5 hover:scale-115 hover:text-shadow-lg/20 text-[16px] font-normal">
                            <Link to="/">Home</Link>
                        </h5>
                        <h5 className="mb-2.5 hover:scale-115 hover:text-shadow-lg/20 text-[16px] font-normal">
                            <Link to="/Contact">Contact</Link>
                        </h5>
                        <h5 className="mb-2.5 hover:scale-115 hover:text-shadow-lg/20 text-[16px] font-normal">
                            <Link to="/About">About</Link>
                        </h5>
                        {!isLoggedIn ? (
                            <>
                                <h5 className="mb-2.5 hover:scale-115 hover:text-shadow-lg/20 text-[16px] font-normal">
                                    <Link to="/SignUp">Sign Up</Link>
                                </h5>
                                <h5 className="mb-2.5 hover:scale-115 hover:text-shadow-lg/20 text-[16px] font-normal">
                                    <Link to="/LogIn">Log In</Link>
                                </h5>
                            </>
                        ) : (
                        
                            <h5 className="mb-2.5 hover:scale-115 hover:text-shadow-lg/20 text-[16px] font-normal cursor-pointer" onClick={handleLogout}>
                                Logout
                            </h5>
                        )}
                        <div className="flex flex-col md:hidden text-lg justify-items-end mt-4">
                            <form  className='mb-2.5 hover:shadow bg-[#F5F5F5] mr-2 w-full py-1.5 px-2 rounded text-[12px] font-normal items-center flex'>
                                <input name='searchBar' type='search' placeholder='What are you looking for?' className='w-full focus:outline-none' />
                                <button type='submit'>
                                    <img src={Search} alt="Search Icon" />
                                </button>
                            </form>
                            <div className='flex flex-row '>
                                <Link to="/wishlist" className='mx-2.5'>
                                    <img src={wishlist} className="hover:scale-115" alt="Wishlist" />
                                </Link>
                                <Link to="/cart" className=''>
                                    <img src={cart} className="hover:scale-115" alt="Cart" />
                                </Link>
                                {isLoggedIn && (
                                    <div className='ml-2.5'>
                                        {user && user.profilePicture ? (
                                            <img src={user.profilePicture} className="w-[32px] h-[32px] rounded-full object-cover" alt="User Profile" />
                                        ) : (
                                            <img src={userIcon} className="w-[32px]" alt="User Icon" />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </nav>
    );
};

export default Navbar;
import React, { useState, useRef, useEffect } from 'react';
import appleLogo from '../assets/applelogo.svg'
import rightArrow from '../assets/rightarrow.svg'
import Phone from '../assets/applephone.svg'
import rightDrop from '../assets/rightdrop.svg';

const Banner1 = () => {
    useEffect(() => {
    const sliders = [
        document.getElementById('slider1'),
        document.getElementById('slider2'),
        document.getElementById('slider3'),
        document.getElementById('slider4'),
        document.getElementById('slider5')
    ];

    const divs = [
        document.getElementById('1st'),
        document.getElementById('2nd'),
        document.getElementById('3rd'),
        document.getElementById('4th'),
        document.getElementById('5th')
    ];

    const updateSliderDisplay = (index) => {
        divs.forEach((div, i) => {
            if (div) {
                if (i === index) {
                    div.classList.remove('hidden');
                } else {
                    div.classList.add('hidden');
                }
            }
        });
    };

    sliders.forEach((slider, index) => {
        if (slider) { 
            slider.addEventListener('change', function() {
                if (this.checked) {
                    currentSliderIndex = index;
                    updateSliderDisplay(currentSliderIndex);
                }
            });
        }
    });

    let currentSliderIndex = 2;
    const autoSlide = setInterval(() => {
        currentSliderIndex = (currentSliderIndex + 1) % sliders.length;

        if (sliders[currentSliderIndex]) {
            sliders[currentSliderIndex].checked = true;
            updateSliderDisplay(currentSliderIndex);
        }
    }, 5000);
    return () => {
                clearInterval(autoSlide);
            };
        }, []);


        const [isOpen, setIsOpen] = useState(false);
        
          const dropdownRef = useRef(null);
          const buttonRef = useRef(null);
        
          useEffect(() => {
            const handleClickOutside = (event) => {
              if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
              ) {
                setIsOpen(false);
              }
            };
        
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
              document.removeEventListener('mousedown', handleClickOutside);
            };
          }, []);
        
          const toggleDropdown = () => {
            setIsOpen(!isOpen);
          };

        const [isOpen2, setIsOpen2] = useState(false);
        
          const dropdownRef2 = useRef(null);
          const buttonRef2 = useRef(null);
        
          useEffect(() => {
            const handleClickOutside = (event) => {
              if (
                dropdownRef2.current &&
                !dropdownRef2.current.contains(event.target) &&
                buttonRef2.current &&
                !buttonRef2.current.contains(event.target)
              ) {
                setIsOpen2(false);
              }
            };
        
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
              document.removeEventListener('mousedown', handleClickOutside);
            };
          }, []);
        
          const toggleDropdown2 = () => {
            setIsOpen2(!isOpen2);
          };

  return (
    <div className='h-[100%] w-[96%] justify-self-center'>
        <div className='my-5 h-[85%]'>
            <div className='flex flex-col md:flex-row '>
            <div className='md:w-[25%] text-[16px] font-normal flex flex-grow flex-col gap-2 pr-7 border-r'>
                <a className='mb-1.5 inline-flex relative'>
                    <button
                    ref={buttonRef}
                    id='dropdownButton'
                    type='button'
                    className='hover:scale-115 hover:text-shadow-lg/20 transition duration-150 ease-in-out flex'
                    onClick={toggleDropdown}
                    >
                    Women's Fashion
                    <img
                        src={rightDrop}
                        alt=''
                        className='ml-10 w-2 text-[#000000]'
                        aria-hidden='true'
                    />
                    </button>

                    <div
                    ref={dropdownRef}
                    id='dropdownDiv'
                    className={`origin-bottom-left absolute left-40 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transform transition ease-out duration-200
                        ${isOpen ? 'opacity-100 scale-100' : 'hidden opacity-0 scale-95'}`}
                    role='menu'
                    aria-orientation='vertical'
                    aria-labelledby='dropdownButton'
                    tabIndex='-1'
                    >
                    <div className='py-1' role='none'>
                        <a href='/women-adult' className='text-[#000000] hover:scale-115 hover:text-shadow-lg/20 block px-4 py-2' role='menuitem' tabIndex='-1' id='menu-item-0'>
                        Adult
                        </a>
                        <a href='/women-kids' className='text-[#000000] hover:scale-115 hover:text-shadow-lg/20 block px-4 py-2' role='menuitem' tabIndex='-1' id='menu-item-1'>
                        Kids
                        </a>
                    </div>
                    </div>
                </a>
                <a className='mb-1.5 inline-flex flex-grow relative'>
                    <button
                    ref={buttonRef2}
                    id='dropdownButton2'
                    type='button'
                    className='hover:scale-115 hover:text-shadow-lg/20 transition duration-150 ease-in-out flex'
                    onClick={toggleDropdown2}
                    >
                    Men's Fashion
                    <img
                        src={rightDrop}
                        alt=''
                        className='ml-10 w-2 text-[#000000]'
                        aria-hidden='true'
                    />
                    </button>

                    <div
                    ref={dropdownRef2}
                    id='dropdownDiv2'
                    className={`origin-bottom-left absolute left-40 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transform transition ease-out duration-200
                        ${isOpen2 ? 'opacity-100 scale-100' : 'hidden opacity-0 scale-95'}`}
                    role='menu'
                    aria-orientation='vertical'
                    aria-labelledby='dropdownButton2'
                    tabIndex='-1'
                    >
                    <div className='py-1' role='none'>
                        <a href='/men-adult' className='text-[#000000] hover:scale-115 hover:text-shadow-lg/20 block px-4 py-2' role='menuitem' tabIndex='-1' id='menu-item-01'>
                        Adult
                        </a>
                        <a href='/men-kids' className='text-[#000000] hover:scale-115 hover:text-shadow-lg/20 block px-4 py-2' role='menuitem' tabIndex='-1' id='menu-item-02'>
                        Kids
                        </a>
                    </div>
                    </div>
                </a>
                <a href="" className='hover:scale-115 hover:text-shadow-lg/20 mb-1.5'>Electronics</a>
                <a href="" className='hover:scale-115 hover:text-shadow-lg/20 mb-1.5'>Home & Lifestyle</a>
                <a href="" className='hover:scale-115 hover:text-shadow-lg/20 mb-1.5'>Medicine</a>
                <a href="" className='hover:scale-115 hover:text-shadow-lg/20 mb-1.5'>Sports & Outdoor</a>
                <a href="" className='hover:scale-115 hover:text-shadow-lg/20 mb-1.5'>Baby's & Toys</a>
                <a href="" className='hover:scale-115 hover:text-shadow-lg/20 mb-1.5'>Groceries & Pets</a>
                <a href="" className='hover:scale-115 hover:text-shadow-lg/20 mb-1.5'>Health & Beauty</a>
            </div>
            <div className='md:ml-5 md:w-[75%] bg-[#000000]'>
            <div id='1st' className='hidden' >
                <div>
                <div className='flex flex-col md:flex-row justify-between  text-white'>
                    <div className='flex flex-col p-10'>
                        <p className='font-normal text-[16px] mb-3 flex flex-row items-center'><img src={appleLogo} alt="" className='pr-3 w=[40px]'/>iPhone 14 Series</p>
                        <p className='mb-3 text-[48px]/[60px] font-semibold'>Up to 10% off Voucher</p>
                        <a href='' className='flex font-medium text-[16px]'>Shop Now <img src={rightArrow} alt="" className='ml-2'/></a>
                    </div>
                    <div className='py-5'>
                        <img src={Phone} alt="" />
                    </div>
                </div>
            </div> 
            </div>
             <div id='2nd' className='hidden bg-amber-950' >
                <div>
                <div className='flex flex-col md:flex-row justify-between  text-white'>
                    <div className='flex flex-col p-10'>
                        <p className='font-normal text-[16px] mb-3 flex flex-row items-center'><img src={appleLogo} alt="" className='pr-3 w=[40px]'/>iPhone 14 Series</p>
                        <p className='mb-3 text-[48px]/[60px] font-semibold'>Up to 0% off Voucher</p>
                        <a href='' className='flex font-medium text-[16px]'>Shop Now <img src={rightArrow} alt="" className='ml-2'/></a>
                    </div>
                    <div className='py-5'>
                        <img src={Phone} alt="" />
                    </div>
                </div>
            </div> 
            </div>
             <div id='3rd' className='' >
                <div>
                <div className='flex flex-col md:flex-row justify-between  text-white'>
                    <div className='flex flex-col p-10'>
                        <p className='font-normal text-[16px] mb-3 flex flex-row items-center'><img src={appleLogo} alt="" className='pr-3 w=[40px]'/>iPhone 14 Series</p>
                        <p className='mb-3 text-[48px]/[60px] font-semibold'>Up to 1% off Voucher</p>
                        <a href='' className='flex font-medium text-[16px]'>Shop Now <img src={rightArrow} alt="" className='ml-2'/></a>
                    </div>
                    <div className='py-5'>
                        <img src={Phone} alt="" />
                    </div>
                </div>
            </div> 
            </div>
             <div id='4th' className='hidden' >
                <div>
                <div className='flex flex-col md:flex-row justify-between  text-white'>
                    <div className='flex flex-col p-10'>
                        <p className='font-normal text-[16px] mb-3 flex flex-row items-center'><img src={appleLogo} alt="" className='pr-3 w=[40px]'/>iPhone 14 Series</p>
                        <p className='mb-3 text-[48px]/[60px] font-semibold'>Up to 02% off Voucher</p>
                        <a href='' className='flex font-medium text-[16px]'>Shop Now <img src={rightArrow} alt="" className='ml-2'/></a>
                    </div>
                    <div className='py-5'>
                        <img src={Phone} alt="" />
                    </div>
                </div>
            </div> 
            </div>
             <div id='5th' className='hidden' >
                <div>
                <div className='flex flex-col md:flex-row justify-between  text-white'>
                    <div className='flex flex-col p-10'>
                        <p className='font-normal text-[16px] mb-3 flex flex-row items-center'><img src={appleLogo} alt="" className='pr-3 w=[40px]'/>iPhone 14 Series</p>
                        <p className='mb-3 text-[48px]/[60px] font-semibold'>Up to 03% off Voucher</p>
                        <a href='' className='flex font-medium text-[16px]'>Shop Now <img src={rightArrow} alt="" className='ml-2'/></a>
                    </div>
                    <div className='py-5'>
                        <img src={Phone} alt="" />
                    </div>
                </div>
            </div> 
            </div>

                <div className='flex justify-center'>
                    <div>
                        <input type="radio" name="slider" className='w-3 mr-2.5 accent-red-500' id="slider1"  /> 
                    </div>
                    <div>
                        <input type="radio" name="slider" className='w-3 mr-2.5 accent-red-500' id="slider2" /> 
                    </div>
                    <div>
                        <input type="radio" name="slider" className='w-3 mr-2.5 accent-red-500' id="slider3" defaultChecked/> 
                    </div>
                    <div>
                        <input type="radio" name="slider" className='w-3 mr-2.5 accent-red-500' id="slider4" /> 
                    </div>
                    <div>
                        <input type="radio" name="slider" className='w-3 mr-2.5 accent-red-500' id="slider5" /> 
                    </div>
                </div>
            </div>
               
            </div>
        </div>
        </div>
  )
}


export default Banner1
import React, { useEffect } from 'react';
import appleLogo from '../assets/applelogo.svg'
import rightArrow from '../assets/rightarrow.svg'
import Phone from '../assets/applephone.svg'

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


  return (
    <div className='h-[100%] w-[96%] justify-self-center border'>
        <div className='my-5 h-[85%]'>
            <div className='flex flex-col md:flex-row '>
            <div className='md:w-[20%] flex flex-col gap-2 pr-7 border-r'>
                <a href="" className='mb-1.5'>Women's Fashion</a>
                <a href="" className='mb-1.5'>Men's Fashion</a>
                <a href="" className='mb-1.5'>Electronics</a>
                <a href="" className='mb-1.5'>Home & Lifestyle</a>
                <a href="" className='mb-1.5'>Medicine</a>
                <a href="" className='mb-1.5'>Sports & Outdoor</a>
                <a href="" className='mb-1.5'>Baby's & Toys</a>
                <a href="" className='mb-1.5'>Groceries & Pets</a>
                <a href="" className='mb-1.5'>Health & Beauty</a>
            </div>
            <div className='md:ml-7 md:w-[80%] bg-[#000000]'>
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
             <div id='2nd' className='hidden' >
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
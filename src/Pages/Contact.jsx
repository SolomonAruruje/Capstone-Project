import React from 'react'
import phone from '../assets/icons-phone.svg'
import email from '../assets/icons-mail.svg'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const Contact = () => {
  return (
    <div>
        <Navbar />
        <div className='flex items-center justify-between my-40 h-[457px]'>
            <div className='w-[30%] h-full shadow-xl flex flex-col rounded-lg items-center py-5'>
                <div className='flex flex-col w-[90%] space-y-8 p-7'>
                    <div className='flex flex-col space-y-5 border-b pb-6'>
                        <p className='text-[16px]/[21px] font-medium flex items-center'><img src={phone} alt="" className='mr-5 w-[40px]'/>Call To Us</p>
                        <p className='text-[14px]/[21px] font-normal'>We are available 24/7, 7 days a week.</p>
                        <p className='text-[14px]/[21px] font-normal'>Phone: +8801611112222</p>
                    </div>
                    <div className='flex flex-col space-y-5'>
                        <p className='text-[16px]/[21px] font-medium flex items-center'><img src={email} alt="" className='mr-5 w-[40px]'/>Write To Us</p>
                        <p className='text-[14px]/[21px] font-normal'>Fill out our form and we will contact you within 24 hours.</p>
                        <p className='text-[14px]/[21px] font-normal'>Emails: customer@exclusive.com</p>
                        <p className='text-[14px]/[21px] font-normal'>Emails: support@exclusive.com</p>
                    </div>
                </div>
            </div>
            <div className='w-2/3 h-full shadow-xl flex flex-col rounded-lg'>
                <form action="" method="post" className='flex flex-col space-y-8 p-10'>
                    <div className='flex justify-between'>
                        <input type="text" placeholder='Your Name' name='name' className='bg-[#F5F5F5] w-[32.5%] h-[50px] px-3 focus:outline-none'/>
                        <input type="email" placeholder='Your Email' name='email' className='bg-[#F5F5F5] w-[32.5%] h-[50px] px-3 focus:outline-none'/>
                        <input type="text" placeholder='Your Phone' name='phone' className='bg-[#F5F5F5] w-[32.5%] h-[50px] px-3 focus:outline-none'/>
                    </div>
                    <div>
                        <textarea type="text" placeholder='Your Message' name='Message' className='bg-[#F5F5F5] h-[207px] w-full p-5 focus:outline-none align-text-top items-start'/>
                    </div>
                    <div className='flex justify-end'>
                        <button className='bg-[#DB4444] text-white rounded-sm py-4 px-12 w-[215px]'>Send Message</button>
                    </div>
                </form>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Contact
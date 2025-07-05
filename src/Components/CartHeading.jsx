import React from 'react'

const CartHeading = () => {
  return (
    <div>
        <div className='hidden md:flex w-full mt-20 items-center font-bold text-[18px] px-7 h-[72px] rounded-lg shadow-lg'>
                    <div className='w-[60%] flex items-center'>
                        <div className='w-[50%] flex items-center'>
                            <p>Product</p>
                        </div>
                        <div className='w-[50%] flex'>
                            <p>Price</p>
                        </div>
                    </div>
                    <div className='w-[40%] flex items-center'>
                        <div className='w-3/4 flex'>
                            <p>Quantity</p>
                        </div>
                        <div className='w-1/4 flex'>
                            <p>Sub Total</p>
                        </div>
                    </div>
                </div>
    </div>
  )
}

export default CartHeading
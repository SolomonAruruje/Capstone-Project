import React from 'react'

const CartProduct = (
{
    id,
    productImage = "",
    productName = '',
    discountPrice =''
}
) => {
  return (
    <div>
        <div className='flex justify-between mb-5' id={id}>
             <div className='flex items-center'>
                <img src={productImage} alt="" className='w-[54px] mr-3.5'/>
                <p className='text-[16px] font-normal'>{productName}</p>
            </div>
            <div>
                <p className='text-[16px] font-medium'>&#8358;{discountPrice}</p>
            </div>   
        </div>
    </div>
  )
}

export default CartProduct
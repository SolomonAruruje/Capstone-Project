import React from 'react'
import { Link } from 'react-router-dom'

const CategoriesDiv = ({
    id,
    categoriesName = "",
    categoriesImage,
}) => {

  return (
    <div>
        <Link to={`/categories/${categoriesName}`} className='items-center justify-around flex flex-col mr-4 w-[170px] h-[145px] rounded border border-[#000000]' id={id}>
            <img src={categoriesImage} alt={`Image of ${categoriesName}`} className='w-[56px]'/>
            <h4 className='text-[16px] font-normal text-[#000000]'>{categoriesName}</h4>
        </Link>
    </div>
  )
}

export default CategoriesDiv
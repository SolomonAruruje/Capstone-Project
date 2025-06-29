import React from 'react'

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center my-50">
        <h1 className="text-center text-[110px] font-medium ">404 Not Found</h1>
        <p className="text-center text-[16px] mt-4">Your visited page not found. You may go back tohome page.</p>
        <a href="/" className="flex justify-center mt-25">
            <button  className="text-white text-[16px] font-medium rounded-sm py-4 px-10 bg-[#DB4444] border">Back to Homepage</button>
        </a>
    </div>
  )
}

export default PageNotFound
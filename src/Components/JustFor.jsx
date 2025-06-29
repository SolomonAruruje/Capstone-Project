import React, { useState, useEffect, useRef } from 'react';
import Product from './Product.jsx';
import { Link } from 'react-router-dom';

const JustFor = () => {
     const scrollContainerRef = useRef(null);
          const [JustForYou, setJustForYou] = useState([]);
          const [loadingJustForYou, setLoadingJustForYou] = useState(true);
          const [errorJustForYou, setErrorJustForYou] = useState(null);
      
      
          useEffect(() => {
              const fetchJustForYou = async () => {
                  setLoadingJustForYou(true);
                  setErrorJustForYou(null);
                  try {
                      const response = await fetch('/flashsales.json');
                      if (!response.ok) {
                          throw new Error(`HTTP error! status: ${response.status}`);
                      }
                      const data = await response.json();
                      setJustForYou(data);
                  } catch (err) {
                      console.error('Failed to fetch JustForYou:', err);
                      setErrorJustForYou(`Failed to load JustForYou: ${err.message}.`);
                      setJustForYou([]);
                  } finally {
                      setLoadingJustForYou(false);
                  }
              };
      
              fetchJustForYou();
          }, []);


  return (
    <div className='w-[96%] mb-25 items-center justify-self-center'>
              <div>
                  <div className='flex justify-between w-full' >
                      <div className='flex w-full space-x-5 items-center'>
                          <div className='w-[20px] h-[40px] rounded bg-[#DB4444] text-transparent'>G</div>
                          <div className=''><p className='text-[20px] text-[#000000] font-semibold '>Just For You</p></div>
                      </div>
                      <div className='w-full justify-between items-center'>  
                          <div className='flex items-center justify justify-self-end'>
                              <Link to='/best-selling'><button type='button' className='text-[#000000] rounded-sm py-3 px-10 bg-white border border-[#000000]'>See All</button></Link>
                          </div>
                      </div>
                  </div>
                  <div
                      ref={scrollContainerRef}
                      className='my-10 flex items-center w-full overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide no-scrollbar'
                  >
                      {loadingJustForYou ? (
                          <div className="text-[16px] font-bold text-gray-400 w-full text-center">Loading JustForYou...</div>
                      ) : errorJustForYou ? (
                          <div className="text-[16px] font-normal text-red-500 w-full text-center">{errorJustForYou}</div>
                      ) : JustForYou.length === 0 ? (
                          <div className="text-[16px] font-normal text-gray-600 w-full text-center">Check back soon!</div>
                      ) : (
                          JustForYou.slice(0, 10).map((item) => (
                              <Product
                                key={item.id}
                                product={item}
                                // id={item.id }
                                // colour={item.colour}
                                // discountPercentage={item.discountPercentage}
                                // productName={item.productName}
                                // price={item.price}
                                // discountPrice={item.discountPrice}
                                // productImage={item.productImage}
                                // rateno={item.rateno}
                                // rating={item.ratingStars}
                                // description={item.description}
                                // state={item.state}
                                // img1={item.img1}
                                // img2={item.img2}
                                // img3={item.img3}
                                // img4={item.img4}
                                // productcolour1={item.productcolour1}
                                // productcolour2={item.productcolour2}
                                // productcolour3={item.productcolour3}
                                // size={item.size}
                                // sizeA={item.sizeA}
                                // sizeB={item.sizeB}
                                // sizeC={item.sizeC}
                                // sizeD={item.sizeD}
                                // sizeE={item.sizeE}
                                // sizeF={item.sizeF}
                                // sizeG={item.sizeG}
                              />
                          ))
                      )}
                  </div>
              </div>
          </div>
  )
}

export default JustFor
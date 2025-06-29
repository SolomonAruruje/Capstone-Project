import React, { useState, useEffect, useRef } from 'react';
import Product from './Product.jsx';
import { Link } from 'react-router-dom';

const BestSellingProducts = () => {
  const scrollContainerRef = useRef(null);
      const [bestSellingProd, setBestSellingProd] = useState([]);
      const [loadingBestSellingProd, setLoadingBestSellingProd] = useState(true);
      const [errorBestSellingProd, setErrorBestSellingProd] = useState(null);
  
  
      useEffect(() => {
          const fetchBestSellingProd = async () => {
              setLoadingBestSellingProd(true);
              setErrorBestSellingProd(null);
              try {
                  const response = await fetch('/flashsales.json');
                  if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                  }
                  const data = await response.json();
                  setBestSellingProd(data);
              } catch (err) {
                  console.error('Failed to fetch BestSellingProd:', err);
                  setErrorBestSellingProd(`Failed to load BestSellingProd: ${err.message}.`);
                  setBestSellingProd([]);
              } finally {
                  setLoadingBestSellingProd(false);
              }
          };
  
          fetchBestSellingProd();
      }, []);
  
   
      return (
          <div className='w-[96%] my-15 items-center justify-self-center'>
              <div>
                  <div className='flex flex-col flex-wrap w-full' >
                      <div className='flex w-full space-x-5 items-center'>
                          <div className='w-[20px] h-[40px] rounded bg-[#DB4444] text-transparent'>G</div>
                          <div className=''><p className='text-[16px] text-[#DB4444] font-semibold '>This Month</p></div>
                      </div>
                      <div className='flex flex-col md:flex-row w-full justify-between items-center'>
                          <h3 className='text-[32px] font-bold'>Best Selling Products</h3>
  
                          <div className='flex items-center justify justify-self-end'>
                              <Link to='/best-selling'><button type='button' className='text-white rounded-sm py-3 px-10 bg-[#DB4444]'>View All</button></Link>
                          </div>
                      </div>
                  </div>
                  <div
                      ref={scrollContainerRef}
                      className='my-10 flex items-center w-full overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide no-scrollbar'
                  >
                      {loadingBestSellingProd ? (
                          <div className="text-[16px] font-bold text-gray-400 w-full text-center">Loading BestSellingProd...</div>
                      ) : errorBestSellingProd ? (
                          <div className="text-[16px] font-normal text-red-500 w-full text-center">{errorBestSellingProd}</div>
                      ) : bestSellingProd.length === 0 ? (
                          <div className="text-[16px] font-normal text-gray-600 w-full text-center">No BestSellingProd active right now. Check back soon!</div>
                      ) : (
                          bestSellingProd.slice(0, 10).map((item) => (
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
    );
  };

export default BestSellingProducts
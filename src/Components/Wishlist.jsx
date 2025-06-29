import React, { useState, useEffect, useRef } from 'react';
import WishProduct from './WishProduct.jsx';
import { Link } from 'react-router-dom';


const Wishlist = () => {

    const scrollContainerRef = useRef(null);
              const [Wishes, setWishes] = useState([]);
              const [loadingWishes, setLoadingWishes] = useState(true);
              const [errorWishes, setErrorWishes] = useState(null);
          
          
              useEffect(() => {
                  const fetchWishes = async () => {
                      setLoadingWishes(true);
                      setErrorWishes(null);
                      try {
                          const response = await fetch('/flashsales.json');
                          if (!response.ok) {
                              throw new Error(`HTTP error! status: ${response.status}`);
                          }
                          const data = await response.json();
                          setWishes(data);
                      } catch (err) {
                          console.error('Failed to fetch Wishes:', err);
                          setErrorWishes(`Failed to load Wishes: ${err.message}.`);
                          setWishes([]);
                      } finally {
                          setLoadingWishes(false);
                      }
                  };
          
                  fetchWishes();
              }, []);


  return (
    <div className='w-[96%] my-25 items-center justify-self-center'>
              <div>
                  <div className='flex w-full justify-between items-center' >
                      <div className='flex w-full space-x-5 items-center'>
                          <div className=''><p className='text-[20px] text-[#000000] font-semibold '>Wislist </p></div>
                      </div>
                      <div className='w-full'>
                          <div className='flex items-center justify justify-self-end'>
                            <button type='button' className='text-[#000000] rounded-sm py-3 px-10 bg-white border border-[#000000]'>Add All To Cart</button>
                          </div>
                      </div>
                  </div>
                  <div
                      ref={scrollContainerRef}
                      className='my-10 flex items-center w-full overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide no-scrollbar'
                  >
                      {loadingWishes ? (
                          <div className="text-[16px] font-bold text-gray-400 w-full text-center">Loading Wishlist...</div>
                      ) : errorWishes ? (
                          <div className="text-[16px] font-normal text-red-500 w-full text-center">{errorWishes}</div>
                      ) : Wishes.length === 0 ? (
                          <div className="text-[16px] font-normal text-gray-600 w-full text-center">Check back soon!</div>
                      ) : (
                          Wishes.map((item) => (
                              <WishProduct
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

export default Wishlist
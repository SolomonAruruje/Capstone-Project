import React, { useState, useEffect, useRef } from 'react';
import Product from './Product.jsx';
import { Link } from 'react-router-dom';

const RelatedItem = () => {
     const scrollContainerRef = useRef(null);
          const [RelatedItems, setRelatedItems] = useState([]);
          const [loadingRelatedItems, setLoadingRelatedItems] = useState(true);
          const [errorRelatedItems, setErrorRelatedItems] = useState(null);
      
      
          useEffect(() => {
              const fetchRelatedItems = async () => {
                  setLoadingRelatedItems(true);
                  setErrorRelatedItems(null);
                  try {
                      const response = await fetch('/flashsales.json');
                      if (!response.ok) {
                          throw new Error(`HTTP error! status: ${response.status}`);
                      }
                      const data = await response.json();
                      setRelatedItems(data);
                  } catch (err) {
                      console.error('Failed to fetch RelatedItems:', err);
                      setErrorRelatedItems(`Failed to load RelatedItems: ${err.message}.`);
                      setRelatedItems([]);
                  } finally {
                      setLoadingRelatedItems(false);
                  }
              };
      
              fetchRelatedItems();
          }, []);


  return (
    <div className='w-[96%] mt-[200px] mb-[100px] items-center justify-self-center'>
              <div>
                  <div className='flex justify-between w-full' >
                      <div className='flex w-full space-x-5 items-center'>
                          <div className='w-[20px] h-[40px] rounded bg-[#DB4444] text-transparent'>G</div>
                          <div className=''><p className='text-[20px] text-[#000000] font-semibold '>Related Item</p></div>
                      </div>
                  </div>
                  <div
                      ref={scrollContainerRef}
                      className='my-10 flex items-center w-full overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide no-scrollbar'
                  >
                      {loadingRelatedItems ? (
                          <div className="text-[16px] font-bold text-gray-400 w-full text-center">Loading RelatedItems...</div>
                      ) : errorRelatedItems ? (
                          <div className="text-[16px] font-normal text-red-500 w-full text-center">{errorRelatedItems}</div>
                      ) : RelatedItems.length === 0 ? (
                          <div className="text-[16px] font-normal text-gray-600 w-full text-center">Check back soon!</div>
                      ) : (
                          RelatedItems.slice(0, 10).map((item) => (
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

export default RelatedItem
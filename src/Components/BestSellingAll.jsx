import React, { useState, useEffect, useRef } from 'react';
import Product from './Product.jsx';

const BestSellingAll = () => {
      const scrollContainerRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [errorProducts, setErrorProducts] = useState(null);


    useEffect(() => {
        const fetchProducts = async () => {
            setLoadingProducts(true);
            setErrorProducts(null);
            try {
                const response = await fetch('/flashsales.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                console.error('Failed to fetch Best Selling products:', err);
                setErrorProducts(`Failed to load products: ${err.message}.`);
                setProducts([]);
            } finally {
                setLoadingProducts(false);
            }
        };

        fetchProducts();
    }, []);
    
    
    return (
        <div className='w-[96%] my-8 items-center justify-self-center'>
            <div>
                <div className='flex flex-col flex-wrap w-full' >
                    <div className='flex w-full space-x-5 items-center'>
                        <div className='w-[30px] bg-[#DB4444] min-h-15 text-transparent'>G</div>
                        <div className=''><p className='text-[16px] text-[#DB4444] font-semibold '>This Month</p></div>
                    </div>
                    <div className='flex flex-col md:flex-row w-full justify-between items-center'>
                        <h3 className='text-[32px] font-bold'>Best Selling Products</h3>
                </div>
                <div
                    ref={scrollContainerRef}
                    className='my-10 flex flex-col md:flex-row md:flex-wrap items-center'
                >
                    {loadingProducts ? (
                        <div className="text-[16px] font-bold text-gray-400 w-full text-center">Loading flash sales products...</div>
                    ) : errorProducts ? (
                        <div className="text-[16px] font-normal text-red-500 w-full text-center">{errorProducts}</div>
                    ) : products.length === 0 ? (
                        <div className="text-[16px] font-normal text-gray-600 w-full text-center">No flash sales active right now. Check back soon!</div>
                    ) : (
                        products.map((item) => (
                            <Product
                                key={item.id}
                                product={item}
                                // id={item.id}
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
        </div>
    );
};

export default BestSellingAll
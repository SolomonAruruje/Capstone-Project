import React, { useState, useEffect, useRef } from 'react';
import leftButton from '../assets/leftbutton.svg';
import rightButton from '../assets/rightbutton.svg';
import Product from './Product';
import { Link } from 'react-router-dom';

const OurProducts = () => {
    const scrollContainerRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [errorProducts, setErrorProducts] = useState(null);

    const scrollAmount = 270;
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };


    useEffect(() => {
        const fetchProducts = async () => {
            setLoadingProducts(true);
            setErrorProducts(null);
            try {
                const response = await fetch('/products.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                console.error('Failed to fetch flash sales products:', err);
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
                        <div className='w-[20px] h-[40px] rounded bg-[#DB4444] text-transparent'>G</div>
                        <div className=''><p className='text-[16px] text-[#DB4444] font-semibold '>Our Products</p></div>
                    </div>
                    <div className='flex flex-col md:flex-row w-full justify-between items-center'>
                        <h3 className='text-[32px] font-bold'>Explore Our Products</h3>
                        <div className='flex items-center justify justify-self-end'>
                            <button id='scrollLeft'><img onClick={scrollLeft} src={leftButton} alt="Scroll Left" className='mr-2 w-[46px]'/></button>
                            <button id='scrollRight'><img onClick={scrollRight} src={rightButton} alt="Scroll Right" className='w-[46px]'/></button>
                        </div>
                    </div>
                </div>
                <div
                    ref={scrollContainerRef}
                    className='mt-5 w-full overflow-x-auto scroll-smooth scrollbar-hide no-scrollbar'
                >
                    <div className='grid grid-flow-col grid-rows-2' style={{ width: `${products.length * 140}px` }}>
                    {loadingProducts ? (
                        <div className="text-[16px] font-bold text-gray-400 w-full text-center">Loading flash sales products...</div>
                    ) : errorProducts ? (
                        <div className="text-[16px] font-normal text-red-500 w-full text-center">{errorProducts}</div>
                    ) : products.length === 0 ? (
                        <div className="text-[16px] font-normal text-gray-600 w-full text-center">No Products available right now. Check back soon!</div>
                    ) : (
                        products.slice(0, 20).map((item) => (
                            <Product
                                key={item.id}
                                id={item.id}
                                discountPercentage={item.discountPercentage}
                                colour={item.colour}
                                productName={item.productName}
                                discountPrice={item.discountPrice}
                                productImage={item.productImage}
                                rateno={item.rateno}
                                rating={item.ratingStars}
                            />
                        ))
                    )}
                    </div>
                </div>
                <div className='justify-self-center items-center mt-10 text-center'>
                   <Link to='/explore-products'><button type='button' className='text-white rounded-sm py-3 px-10 bg-[#DB4444]'>View All Products</button></Link>
                </div>
            </div>
        </div>
    );
};

export default OurProducts;
import React, { useState, useCallback, useEffect, useRef } from 'react';
import CategoriesDiv from './CategoriesDiv';
import leftButton from '../assets/leftButton.svg';
import rightButton from '../assets/rightButton.svg';

const Category = () => {
    const scrollContainerRef = useRef(null);
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [errorCategories, setErrorCategories] = useState(null);

    const scrollAmount = 170;
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
        const fetchCategories = async () => {
            setLoadingCategories(true);
            setErrorCategories(null);
            try {
                const response = await fetch('/categories.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCategories(data);
            } catch (err) {
                console.error('Failed to fetch Categories:', err);
                setErrorCategories(`Failed to load Categories: ${err.message}.`);
                setCategories([]);
            } finally {
                setLoadingCategories(false);
            }
        };

        fetchCategories();
    }, []);

 
    return (
        <div className='w-[96%] my-8 items-center justify-self-center'>
            <div>
                <div className='flex flex-col flex-wrap w-full' >
                    <div className='flex w-full space-x-5 items-center'>
                        <div className='w-[20px] h-[40px] rounded bg-[#DB4444] text-transparent'>G</div>
                        <div className=''><p className='text-[16px] text-[#DB4444] font-semibold '>Categories</p></div>
                    </div>
                    <div className='flex flex-col md:flex-row w-full justify-between items-center'>
                        <h3 className='text-[32px] font-bold'>Browse By Category</h3>

                        <div className='flex items-center justify justify-self-end'>
                            <button id='scrollLeft'><img onClick={scrollLeft} src={leftButton} alt="Scroll Left" className='mr-2 w-[46px]'/></button>
                            <button id='scrollRight'><img onClick={scrollRight} src={rightButton} alt="Scroll Right" className='w-[46px]'/></button>
                        </div>
                    </div>
                </div>
                <div
                    ref={scrollContainerRef}
                    className='my-10 flex items-center w-full overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide no-scrollbar'
                >
                    {loadingCategories ? (
                        <div className="text-[16px] font-bold text-gray-400 w-full text-center">Loading Categories...</div>
                    ) : errorCategories ? (
                        <div className="text-[16px] font-normal text-red-500 w-full text-center">{errorCategories}</div>
                    ) : categories.length === 0 ? (
                        <div className="text-[16px] font-normal text-gray-600 w-full text-center">No Categories active right now. Check back soon!</div>
                    ) : (
                        categories.map((item) => (
                            <CategoriesDiv
                                key={item.id}
                                id={item.id }
                                categoriesName={item.categoriesName}
                                categoriesImage={item.categoriesImage}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
  );
};

export default Category
import React, { useState, useCallback, useEffect, useRef } from 'react';
import leftButton from '../assets/leftbutton.svg';
import rightButton from '../assets/rightbutton.svg';
import ProductDiscount from './ProductDiscount';

const FlashSales = () => {
    const scrollContainerRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [errorProducts, setErrorProducts] = useState(null);

    const [targetDate, setTargetDate] = useState(null);
    const [isLoadingDate, setIsLoadingDate] = useState(true);
    const [errorDate, setErrorDate] = useState(null);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isCountingDown, setIsCountingDown] = useState(true);

    const scrollAmount = 300; // Adjust based on your product card width
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

    // --- Fetch Products from Backend ---
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
                console.error('Failed to fetch flash sales products:', err);
                setErrorProducts(`Failed to load products: ${err.message}.`);
                setProducts([]);
            } finally {
                setLoadingProducts(false);
            }
        };

        fetchProducts();
    }, []);

    // --- Existing Countdown Logic ---
    useEffect(() => {
        const fetchTargetDate = async () => {
            setIsLoadingDate(true);
            setErrorDate(null);
            try {
                const response = await fetch('/datew.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const fetchedTimestamp = new Date(data.targetDate).getTime();

                if (isNaN(fetchedTimestamp)) {
                    throw new Error("Invalid date format received from backend.");
                }

                setTargetDate(fetchedTimestamp);
            } catch (err) {
                console.error("Failed to fetch target date:", err);
                setErrorDate(`Failed to load countdown: ${err.message}. Please try again later.`);
                setTargetDate(null);
                setIsCountingDown(false);
            } finally {
                setIsLoadingDate(false);
            }
        };

        fetchTargetDate();
    }, []);

    const calculateTimeLeft = useCallback(() => {
        if (targetDate === null) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference < 0) {
            setIsCountingDown(false);
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        return { days: d, hours: h, minutes: m, seconds: s };
    }, [targetDate]);

    useEffect(() => {
        if (targetDate === null || isLoadingDate || errorDate) {
            return;
        }

        const { days, hours, minutes, seconds } = calculateTimeLeft();
        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);

        const timer = setInterval(() => {
            const { days, hours, minutes, seconds } = calculateTimeLeft();
            setDays(days);
            setHours(hours);
            setMinutes(minutes);
            setSeconds(seconds);

            if (days === 0 && hours === 0 && minutes === 0 && seconds === 0 && !isCountingDown) {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate, isCountingDown, isLoadingDate, errorDate, calculateTimeLeft]);

    const formatTime = (time) => String(time).padStart(2, '0');

    return (
        <div className='w-[96%] my-8 items-center justify-self-center'>
            <div>
                <div className='flex flex-col flex-wrap w-full' >
                    <div className='flex w-full space-x-5 items-center'>
                        <div className='w-[30px] bg-[#DB4444] min-h-15 text-transparent'>G</div>
                        <div className=''><p className='text-[16px] text-[#DB4444] font-semibold '>Today's</p></div>
                    </div>
                    <div className='flex flex-col md:flex-row w-full justify-between items-center'>
                        <h3 className='text-[32px] font-bold'>Flash Sales</h3>
                        <div>
                            {errorDate ? (
                                <div className="text-[16px] font-normal text-red-500 text-center">{errorDate}</div>
                            ) : isLoadingDate ? (
                                <div className="text-[16px] font-bold text-gray-400">Loading timer data...</div>
                            ) : (
                                isCountingDown ? (
                                    <div className="flex items-center space-x-2">
                                        {/* Days section */}
                                        <div className="flex flex-col items-center">
                                            <span className="text-[16px] font-normal mb-0 text-[#000000]">Days</span>
                                            <span className="text-[32px] font-bold text-[#000000]">
                                                {formatTime(days)}
                                            </span>
                                        </div>
                                        <span className="text-[32px] text-[#ff0000] mt-7 font-bold">:</span>
                                        {/* Hours section */}
                                        <div className="flex flex-col items-center">
                                            <span className="text-[16px] font-normal mb-0 text-[#000000]">Hours</span>
                                            <span className="text-[32px] font-bold text-[#000000]">
                                                {formatTime(hours)}
                                            </span>
                                        </div>
                                        <span className="text-[32px] text-[#ff0000] mt-7 font-bold">:</span>
                                        {/* Minutes section */}
                                        <div className="flex flex-col items-center">
                                            <span className="text-[16px] font-normal mb-0 text-[#000000]">Minutes</span>
                                            <span className="text-[32px] font-bold text-[#000000]">
                                                {formatTime(minutes)}
                                            </span>
                                        </div>
                                        <span className="text-[32px] text-[#ff0000] mt-7 font-bold">:</span>
                                        {/* Seconds section */}
                                        <div className="flex flex-col items-center">
                                            <span className="text-[16px] font-normal mb-0 text-[#000000]">Seconds</span>
                                            <span className="text-[32px] font-bold text-[#000000]">
                                                {formatTime(seconds)}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-[32px] font-bold text-[#000000]">Countdown Finished!</div>
                                )
                            )}
                        </div>
                        <div className='flex items-center justify justify-self-end'>
                            <button id='scrollLeft'><img onClick={scrollLeft} src={leftButton} alt="Scroll Left" className='mr-2 w-[46px]'/></button>
                            <button id='scrollRight'><img onClick={scrollRight} src={rightButton} alt="Scroll Right" className='w-[46px]'/></button>
                        </div>
                    </div>
                </div>
                <div
                    ref={scrollContainerRef}
                    className='mt-5 flex items-center w-full overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide' // <-- KEY CHANGES HERE
                >
                    {loadingProducts ? (
                        <div className="text-[16px] font-bold text-gray-400 w-full text-center">Loading flash sales products...</div>
                    ) : errorProducts ? (
                        <div className="text-[16px] font-normal text-red-500 w-full text-center">{errorProducts}</div>
                    ) : products.length === 0 ? (
                        <div className="text-[16px] font-normal text-gray-600 w-full text-center">No flash sales active right now. Check back soon!</div>
                    ) : (
                        products.map((item) => (
                            <ProductDiscount
                                key={item.id}
                                discountPercentage={item.discountPercentage}
                                productName={item.productName}
                                price={item.price}
                                discountPrice={item.discountPrice}
                                productImage={item.productImage}
                                rateno={item.rateno}
                                rating={item.ratingStars}
                            />
                        ))
                    )}
                </div>
                <div className='justify-self-center items-center mt-10 text-center'>
                    <button className='text-white rounded-sm py-3 px-10 bg-[#DB4444]'>View All Products</button>
                </div>
            </div>
        </div>
    );
};

export default FlashSales;
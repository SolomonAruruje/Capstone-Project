import React, { useState, useEffect } from 'react'
import leftButton from '../assets/leftbutton.svg'
import rightButton from '../assets/rightbutton.svg'
// import datejson from '../../public/datew.json'

const FlashSales = () => {
    const [targetDate, setTargetDate] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const [error, setError] = useState(null);

    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isCountingDown, setIsCountingDown] = useState(true);

    useEffect(() => {
    const fetchTargetDate = async () => {
      setIsLoading(true);
      setError(null);
      try {
        
        const response = await fetch('../../public/datew.json?url');

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
        setError(`Failed to load countdown: ${err.message}. Please try again later.`);
        
        setTargetDate(null);
        setIsCountingDown(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTargetDate();
  }, []);


  const calculateTimeLeft = () => {

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
  };
  
  useEffect(() => {
    
    if (targetDate === null || isLoading || error) {
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
  }, [targetDate, isCountingDown, isLoading, error]);

  const formatTime = (time) => String(time).padStart(2, '0');

    return (
    <div className='w-[96%] items-center justify-self-center'>
        <div>
            <div className='flex flex-col flex-wrap w-full' >
                <div>

                </div>
                <div className='flex w-full justify-between items-center'>
                    <h3 className='text-[32px] font-bold'>Flash Sales</h3>
                    <div>
                        {error ? (
                        <div className="text-[16px] font-normal text-red-500 text-center">{error}</div>
                        ) : isLoading ? (
                        <div className="text-[16px] font-bold text-gray-400">Loading timer data...</div>
                        ) : (
                        isCountingDown ? (
                            <div className="flex items-center space-x-3 md:space-x-3">
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
                        <button><img src={leftButton} alt="" className='mr-2'/></button>
                        <button><img src={rightButton} alt=""/></button>
                    </div>
                </div>
            </div>
            <div>

            </div>
            <div>

            </div>
        </div>
    </div>
  )
}

export default FlashSales
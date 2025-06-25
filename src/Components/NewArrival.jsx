import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const NewArrival = () => {
    const [bannerData, setBannerData] = useState(false);
    const [loadingNewArrivalBanners, setLoadingNewArrivalBanners] = useState(true);
    const [errorNewArrivalBanners, setErrorNewArrivalBanners] = useState(null);

    useEffect(() => {
        const fetchBannerData = async () => {
            setLoadingNewArrivalBanners(true);
            setErrorNewArrivalBanners(null);
            try {
                // --- INSERT YOUR ACTUAL BACKEND API ADDRESS HERE ---
                const API_ENDPOINT = '/NewArrivals.json'; // <--- CHANGE THIS LINE

                const response = await fetch(API_ENDPOINT);

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! Status: ${response.status}. Response: ${errorText}`);
                }

                const data = await response.json();

                if (Array.isArray(data) && data.length > 0) {
                    setBannerData(data[0]);
                } else if (data && typeof data === 'object' && Object.keys(data).length > 0) {
                    setBannerData(data);
                } else {
                    setErrorNewArrivalBanners("No new arrival banner data received or data is empty.");
                }
            } catch (err) {
                setErrorNewArrivalBanners(err.message || 'Network error or unexpected issue loading banners.');
                console.error("Error fetching new arrival banners:", err);
            } finally {
                setLoadingNewArrivalBanners(false);
            }
        };

        fetchBannerData();
    }, []);

  return (
    <div>
        <div>
            {loadingNewArrivalBanners ? (
                <div className="text-center text-blue-500 font-semibold mt-10">Loading new arrival features...</div>
            ) : errorNewArrivalBanners ? (
                <div className="text-center text-red-600 font-semibold mt-10">Error: {errorNewArrivalBanners}</div>
            ) : bannerData ? (
            <>
                <div className='flex flex-col w-full'>
                    <div className='flex w-full space-x-5 items-center'>
                        <div className='w-[30px] bg-[#DB4444] min-h-15 text-transparent'>G</div>
                        <div className=''><p className='text-[16px] text-[#DB4444] font-semibold '>Featured</p></div>
                    </div>
                    <div className='flex'>
                        <h3 className='text-[32px] font-bold text-[#000000]'>{bannerData.sectionHeading}</h3>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row w-full justify-between items-center my-10'>
                    <div className='w-[49%] h-[600px] bg-[#000000] items-center relative'>
                        <img src={bannerData.image1} alt="" className='w-[511px] absolute bottom-0 left-[50%] transform -translate-x-1/2'/>
                        <div className='hover:scale-105 absolute bottom-10 left-10 text-white space-y-4 flex flex-col flex-wrap'>
                            <h4 className='text-[24px] font-semibold'>{bannerData.heading1}</h4>
                            <p className='text-[14px]/[21px] font-normal w-[250px] flex-wrap'>{bannerData.description1}</p>
                            <Link to={`/categories/${encodeURIComponent(bannerData.link1)}`} className='text-[16px] font-medium underline'>Shop Now</Link>
                        </div>
                    </div>
                    <div className='flex flex-col w-[49%] h-[600px] justify-between'>
                        <div className='w-full h-[49%] bg-[#000000] items-center relative'>
                            <img src={bannerData.image2} alt="" className='max-h-[286px] absolute bottom-0 right-1'/>
                            <div className='hover:scale-105 absolute bottom-5 left-5 text-white space-y-3 flex flex-col flex-wrap'>
                                <h4 className='text-[24px] font-semibold'>{bannerData.heading2}</h4>
                                <p className='text-[14px]/[21px] font-normal w-[250px] flex-wrap'>{bannerData.description2}</p>
                                <Link to={`/categories/${encodeURIComponent(bannerData.link2)}`} className='text-[16px] font-medium underline'>Shop Now</Link>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div className='w-[48%] h-[284px] bg-[#000000] items-center relative'>
                                <img src={bannerData.image3} alt="" className='max-h-[215px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]'/>
                                <div className='hover:scale-105 absolute bottom-5 left-5 text-white space-y-3 flex flex-col flex-wrap'>
                                    <h4 className='text-[24px] font-semibold'>{bannerData.heading3}</h4>
                                    <p className='text-[14px]/[21px] font-normal w-[85%] flex-wrap'>{bannerData.description3}</p>
                                    <Link to={`/categories/${encodeURIComponent(bannerData.link3)}`} className='text-[16px] font-medium underline'>Shop Now</Link>
                                </div>
                            </div>
                            <div className='w-[48%] h-[284px] bg-[#000000] items-center relative'>
                                <img src={bannerData.image4} alt="" className='max-h-[215px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]'/>
                                <div className='hover:scale-105 absolute bottom-5 left-5 text-white space-y-3 flex flex-col flex-wrap'>
                                    <h4 className='text-[24px] font-semibold'>{bannerData.heading4}</h4>
                                    <p className='text-[14px]/[21px] font-normal w-[85%] flex-wrap'>{bannerData.description4}</p>
                                    <Link to={`/categories/${encodeURIComponent(bannerData.link4)}`} className='text-[16px] font-medium underline'>Shop Now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            ) : (
                !loadingNewArrivalBanners && !errorNewArrivalBanners && (
              <div className="text-center text-gray-600 font-semibold mt-10">No new arrival features available at the moment.</div>
                )
            )}
        </div>
    </div>
  )
};

export default NewArrival
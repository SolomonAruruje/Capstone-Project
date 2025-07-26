
import React, { useState } from 'react';
import wishlist from '../assets/wishlist2.svg';
import iconDelivery from '../assets/icon-delivery.svg';
import iconReturn from '../assets/Icon-return.svg';
import Stars from './Stars';
import { useCart } from '../CartContext'; 

const ProductDetails = ({ product }) => {
  if (!product) return null;

  const {
    id = '',
    name = '',
    description = '',
    imageUrls = [],
    price = 0,
    oldPrice = '',
    discountPercentage = '',
    discountColorCode = '',
    quantity = 0, 
    averageRating = 0,
    totalReviews = 0,
    attributes = {},
  } = product;

  const mainImage = imageUrls[0] || '';
  const thumbnails = imageUrls.slice(0, 4);

  const [qty, setQty] = useState(1);
  const [selectedState, setSelectedState] = useState('');
  const [selectedLGA, setSelectedLGA] = useState('');
  const [showAddedToCartMessage, setShowAddedToCartMessage] = useState(false); 

  const { addToCart } = useCart();

  const handleQtyChange = (delta) => {
    setQty(prev => {
      const newQty = prev + delta;
      if (newQty < 1) return 1;
  
      if (newQty > quantity) return quantity;
      return newQty;
    });
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: qty, 
    });
    setShowAddedToCartMessage(true);
    setTimeout(() => {
      setShowAddedToCartMessage(false);
    }, 2000);
  };

  const states = ['Lagos', 'Abuja', 'Kano', 'Rivers'];
  const lgas = {
    Lagos: ['Ikeja', 'Lekki', 'Epe', 'Surulere'],
    Abuja: ['Gwagwalada', 'Kuje', 'Bwari'],
    Kano: ['Fagge', 'Tarauni', 'Nassarawa'],
    Rivers: ['Obio-Akpor', 'Port Harcourt', 'Eleme'],
  };

  return (
    <div className="my-[100px] h-auto object-contain">
      <div id={id} className="flex flex-col md:flex-row justify-between items-center p-6">
        {/* Thumbnails */}
        <div className="flex flex-row md:flex-col gap-4 md:h-[500px] mr-5">
          {thumbnails.map((thumb, idx) => (
            <div key={idx} className="w-[100px] h-[100px] bg-[#F5F5F5] flex items-center justify-center rounded-sm">
              <img src={thumb} alt={`thumb-${idx}`} className="max-w-[85%] max-h-[85%]" />
            </div>
          ))}
        </div>

        {/* Main Image */}
        <div className="w-full md:w-[400px] md:h-[500px] bg-[#F5F5F5] flex items-center justify-center relative rounded-sm mb-5 md:mb-0">
          <img src={mainImage} alt={name} className="max-w-[85%] max-h-[85%]" />
          {discountPercentage && (
            <p className="absolute top-2 left-2 px-3 py-1 text-white text-[12px] rounded" style={{ backgroundColor: discountColorCode }}>
              {discountPercentage}
            </p>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col w-full max-w-[400px]">
          <h4 className="text-[24px] font-semibold">{name}</h4>
          <div className="flex items-center my-2">
            <Stars rating={averageRating} />
            <p className="ml-2 text-[14px] text-[#000000]">
              ({totalReviews} Reviews) | <span className='text-green-600'>{quantity > 0 ? 'In Stock' : 'Out of Stock'}</span>
            </p>
          </div>

          <p className="text-[24px] font-semibold">&#8358;{price}
            {oldPrice && <span className="ml-4 line-through text-gray-500 text-[20px]">{oldPrice}</span>}
          </p>

          <p className="text-[14px] mt-3 text-justify">{description}</p>

          {/* Attributes */}
          {attributes.color && (
            <div className="mt-4">
              <p className="font-medium">Color:
                <span className="ml-2 inline-block w-[16px] h-[16px] rounded-full border" style={{ backgroundColor: attributes.color }} />
              </p>
            </div>
          )}
          {attributes.size && (
            <p className="font-medium mt-2">Size: <span className="font-bold ml-2">{attributes.size}</span></p>
          )}

          {/* Quantity & Actions */}
          <div className="flex items-center space-x-3 mt-5">
            <div className="flex">
              <button onClick={() => handleQtyChange(-1)} className="w-[30px] border rounded-l" disabled={qty <= 1}>-</button>
              <input value={qty} readOnly className="w-[55px] text-center border" />
              <button onClick={() => handleQtyChange(1)} className="w-[30px] border rounded-r" disabled={qty >= quantity}>+</button>
            </div>
            <button onClick={handleAddToCart} className="bg-[#DB4444] text-white px-5 py-2 rounded hover:bg-red-600 transition">
              Add to Cart
            </button>
            <button className="border p-2 rounded">
              <img src={wishlist} alt="Wishlist" className="w-5 h-5" />
            </button>
          </div>
          {/* Feedback message */}
          {showAddedToCartMessage && (
            <p className="text-green-600 text-sm mt-2 animate-fade-in-out">Product added to cart!</p>
          )}

          {/* Delivery & Returns */}
          <div className="mt-6 space-y-3">
            <div className="border border-[#000000] p-3">
              <div className="flex items-center mb-2">
                <img src={iconDelivery} alt="Delivery Icon" className="mr-2" />
                <p className="font-semibold">Free Delivery</p>
              </div>
              <div className="text-sm">
                <label className="block mb-1 font-medium">Select State</label>
                <select value={selectedState} onChange={e => { setSelectedState(e.target.value); setSelectedLGA(''); }} className="border w-full p-1">
                  <option value="">Select</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>

                {selectedState && (
                  <>
                    <label className="block mt-2 mb-1 font-medium">Select LGA</label>
                    <select value={selectedLGA} onChange={e => setSelectedLGA(e.target.value)} className="border w-full p-1">
                      <option value="">Select</option>
                      {lgas[selectedState].map(lga => (
                        <option key={lga} value={lga}>{lga}</option>
                      ))}
                    </select>
                  </>
                )}
              </div>
            </div>

            <div className="flex border border-[#000000] p-3 items-center">
              <img src={iconReturn} alt="Return Icon" className="mr-2" />
              <div>
                <p>Return Delivery</p>
                <p className="text-[12px] font-medium">Free 30 Days Returns. <a href="#" className="underline">Details</a></p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
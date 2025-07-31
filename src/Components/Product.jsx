
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import wishlist from '../assets/wishlist2.svg';
import quickView from '../assets/quickview.svg';
import Stars from './Stars';
import { useCart } from '../CartContext'; // Import the useCart hook

const Product = ({ product }) => {
  const {
    id = '',
    name = '',
    description = '',
    price, // Price from backend
    oldPrice,
    quantity, // This is the max available quantity from backend
    discountPercentage,
    discountColorCode,
    averageRating = 0,
    totalReviews = 0,
    imageUrls = [],
    attributes = {},
  } = product;

  const [selectedColor] = useState(attributes.color || '');
  const [selectedSize] = useState(attributes.size || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [desiredQty, setDesiredQty] = useState(1);
  const [showAddedToCartMessage, setShowAddedToCartMessage] = useState(false); // New state for feedback

  const { addToCart } = useCart(); // Use the useCart hook

  if (!product) return null;

  const productImage = imageUrls[0] || '';
  const thumbnails = imageUrls.slice(0, 4);

  const handleQtyInput = (delta) => {
    setDesiredQty((prev) => {
      const productStock = parseInt(quantity, 10); // Parse product's stock quantity
      if (isNaN(productStock)) {
        console.warn("Product stock quantity is not a number:", quantity);
        return prev;
      }
      const newQty = prev + delta;
      if (newQty < 1) return 1;
      if (newQty > productStock) return productStock; // Use parsed stock
      return newQty;
    });
  };

  const handleAddToCart = () => {
    const parsedPrice = parseFloat(price);
    const parsedQuantity = parseInt(quantity, 10); // This is the product's stock

    if (isNaN(parsedPrice) || isNaN(parsedQuantity)) {
        console.error("Invalid product data for adding to cart:", product);
        return;
    }

    addToCart({
      ...product,
      price: parsedPrice,
      quantity: desiredQty,
      maxQuantity: parsedQuantity,
    });
    
    // Show a success message for 2 seconds
    setShowAddedToCartMessage(true);
    setTimeout(() => {
      setShowAddedToCartMessage(false);
    }, 2000);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDesiredQty(1); // Reset quantity when closing modal
  };

  return (
    <div>
      {/* Product Card */}
      <div className='flex flex-col mr-4 w-[250px] lg:w-[270px] flex-shrink-0 mb-5' id={id}>
        <div className='items-center flex group overflow-hidden cursor-pointer gap-5 bg-[#F5F5F5] relative rounded-sm p-5 w-[250px] lg:w-[270px] h-[250px]'>
          <Link to={`/product-details/${id}`}>
            <img src={productImage} alt={name} className='absolute w-[172px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
          </Link>
          {/* Add to Cart button on product card */}
          <button 
            onClick={handleAddToCart}
            className='absolute bottom-0 left-0 right-0 h-[41px] text-white text-[16px] font-medium w-full transition-opacity duration-300 pointer-events-auto opacity-100 lg:opacity-0 lg:pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto bg-[#000000]'>
            Add To Cart
          </button>
          {discountPercentage && (
            <p className='absolute top-2 left-2 px-2 py-1 text-white rounded text-[12px] font-normal' style={{ backgroundColor: discountColorCode }}>
              {discountPercentage}
            </p>
          )}
          <div className='absolute right-2 top-2 flex flex-col space-y-2 items-center'>
            <button><img src={wishlist} alt="Wishlist" className='w-[34px] rounded-xl' /></button>
            <button onClick={() => setIsModalOpen(true)}><img src={quickView} alt="Quick View" className='w-[34px] rounded-xl hidden md:flex' /></button>
          </div>
        </div>
        <div>
          <h4 className='text-[16px] font-semibold'>{name}</h4>
          <p className='text-[16px] text-[#DB4444] font-medium'>&#8358;{parseFloat(price).toLocaleString()}
            <span className='ml-3 text-[#000000] line-through'>{oldPrice ? parseFloat(oldPrice).toLocaleString() : ''}</span>
          </p>
          <div className="flex items-center">
            <Stars rating={averageRating} />
            <span className="ml-2 text-[14px] font-semibold text-[#000000]">({totalReviews})</span>
          </div>
        </div>
      </div>

      {/* Added to cart feedback message */}
      {showAddedToCartMessage && (
        <div className="fixed top-20 right-5 z-50 p-4 bg-green-500 text-white rounded-md shadow-lg transition-all duration-300">
          Item added to cart!
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 p-4">
          <div className="relative bg-white rounded-lg shadow-lg w-[85%] max-w-[1000px]">
            <button onClick={handleCloseModal} className="absolute top-2 right-4 text-3xl hover:text-red-600">
              &times;
            </button>

            <div className='flex flex-col md:flex-row p-6 gap-5'>
              {/* Thumbnails */}
              <div className='flex flex-row md:flex-col gap-4'>
                {thumbnails.map((img, idx) => (
                  <div key={idx} className='w-[100px] h-[100px] bg-[#F5F5F5] rounded-sm flex items-center justify-center'>
                    <img src={img} alt={`thumbnail-${idx}`} className='max-w-[85%] max-h-[85%]' />
                  </div>
                ))}
              </div>

              {/* Main Image */}
              <div className='w-[400px] h-[465px] bg-[#F5F5F5] rounded-sm flex items-center justify-center relative'>
                <img src={productImage} alt={name} className='max-w-[85%] max-h-[85%]' />
                {discountPercentage && (
                  <p className='absolute top-2 left-2 px-3 py-1 text-white text-[12px] rounded' style={{ backgroundColor: discountColorCode }}>
                    {discountPercentage}
                  </p>
                )}
              </div>

              {/* Details */}
              <div className='flex flex-col justify-between w-full max-w-[300px]'>
                <div className='border-b pb-4'>
                  <h4 className='text-[24px] font-semibold'>{name}</h4>
                  <div className='flex items-center mt-2 mb-3'>
                    <Stars rating={averageRating} />
                    <p className='text-[14px] ml-2'>( {totalReviews} Reviews ) | <span className='text-green-600'>{parseInt(quantity, 10) > 0 ? 'In Stock' : 'Out of Stock'}</span></p>
                  </div>
                  <p className='text-[24px] font-semibold'>&#8358;{parseFloat(price).toLocaleString()}
                    <span className='ml-4 line-through text-gray-500 text-[20px]'>{oldPrice ? parseFloat(oldPrice).toLocaleString() : ''}</span>
                  </p>
                  <p className='text-[14px] mt-3 text-justify'>{description}</p>
                </div>

                {/* Color & Size display */}
                <div className='mt-3'>
                  {selectedColor && (
                    <p className="font-medium mb-1">Color: <span className='inline-block w-[16px] h-[16px] ml-2 rounded-full border' style={{ backgroundColor: selectedColor }} /></p>
                  )}
                  {selectedSize && (
                    <p className="font-medium">Size: <span className='ml-2 font-bold'>{selectedSize}</span></p>
                  )}
                </div>

                {/* Quantity & Actions */}
                <div className='flex items-center space-x-2 mt-4'>
                  <div className='flex'>
                    <button onClick={() => handleQtyInput(-1)} className='w-[30px] border rounded-l' disabled={desiredQty <= 1}>-</button>
                    <input value={desiredQty} readOnly className='w-[55px] text-center border' />
                    <button onClick={() => handleQtyInput(1)} className='w-[30px] border rounded-r' disabled={desiredQty >= parseInt(quantity, 10)}>+</button>
                  </div>
                  {/* Add to Cart button in quick view modal */}
                  <button onClick={handleAddToCart} className='bg-[#DB4444] text-white px-4 py-2 rounded hover:bg-red-600 transition'>
                    Add To Cart
                  </button>
                  <button className='border p-2 rounded'>
                    <img src={wishlist} alt="Wishlist" className='w-5 h-5' />
                  </button>
                </div>

                {/* Show Available Quantity */}
                <div className='mt-2 text-[14px] text-gray-600'>
                  Available: <strong>{parseInt(quantity, 10)}</strong> item{parseInt(quantity, 10) !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;


// src/Components/OurProducts.jsx
import React, { useState, useEffect, useRef } from 'react';
import Product from './Product';
import leftbutton from '../assets/leftbutton.svg';
import rightbutton from '../assets/rightbutton.svg';
import { Link } from 'react-router-dom';

const OurProducts = () => {
  const scrollRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scrollAmount = 270;

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:8080/api/products');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError(`Failed to load products: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="w-[96%] my-8 mx-auto">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-[20px] h-[40px] bg-[#DB4444] rounded text-transparent">G</div>
          <p className="text-[16px] text-[#DB4444] font-semibold">Our Products</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <h3 className="text-[32px] font-bold">Explore Our Products</h3>
          <div className="flex gap-2 mt-4 md:mt-0">
            <button onClick={scrollLeft}>
              <img src={leftbutton} alt="Scroll Left" className="w-[46px]" />
            </button>
            <button onClick={scrollRight}>
              <img src={rightbutton} alt="Scroll Right" className="w-[46px]" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="mt-6 overflow-x-auto scroll-smooth scrollbar-hide no-scrollbar pb-4"
      >
        <div className="grid grid-flow-col auto-cols-max gap-5">
          {loading && (
            <p className="text-[16px] font-bold text-gray-400 w-full text-center">
              Loading products...
            </p>
          )}
          {error && (
            <p className="text-[16px] font-normal text-red-500 w-full text-center">
              {error}
            </p>
          )}
          {!loading && !error && products.length === 0 && (
            <p className="text-[16px] font-normal text-gray-600 w-full text-center">
              No products available. Check back soon!
            </p>
          )}
          {!loading &&
            !error &&
            products.slice(0, 20).map((product) => (
              <Product key={product.id} product={product} />
            ))}
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link to="/explore-products">
          <button className="text-white bg-[#DB4444] py-3 px-10 rounded-sm hover:bg-red-600 transition">
            View All Products
          </button>
        </Link>
      </div>
    </section>
  );
};

export default OurProducts;


import React, { useState, useEffect, useRef } from 'react';
import Product from './Product';

const AllProducts = () => {
    const scrollContainerRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                setError(`Could not load products: ${err.message}`);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className='w-[96%] my-8 mx-auto'>
            <div className='flex flex-col space-y-4'>
                {/* Section Header */}
                <div className='flex items-center space-x-4'>
                    <div className='w-[30px] bg-[#DB4444] h-5 text-transparent rounded'>G</div>
                    <h2 className='text-[#DB4444] text-[16px] font-semibold'>Our Products</h2>
                </div>

                <div className='flex flex-col md:flex-row justify-between items-center'>
                    <h3 className='text-[32px] font-bold'>Explore Our Products</h3>
                </div>

                {/* Product Grid */}
                <div
                    ref={scrollContainerRef}
                    className='my-10 flex flex-wrap justify-center gap-6'
                >
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
                    {!loading && !error && products.map(product => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AllProducts;


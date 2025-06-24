import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from './Product.jsx';
import NavBar from './Navbar';
import Footer from './Footer';

const CategoryDetailPage = () => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch ALL products from backend
                const response = await fetch('/products.json')
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const allProducts = await response.json();

                // Filter products by categoryName
                const filteredProducts = allProducts.filter(
                    (product) => product.category && product.category.toLowerCase() === categoryName.toLowerCase()
                );

                setProducts(filteredProducts);
            } catch (err) {
                console.error(`Failed to fetch products for category ${categoryName}:`, err);
                setError(`Failed to load products for "${categoryName}": ${err.message}.`);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryProducts();
    }, [categoryName]);

    return (
        <div>
            <NavBar />
        <div className="w-[96%] mx-auto my-8">
            <h1 className="text-[36px] font-bold mb-6 text-center md:text-left">
                Category: {categoryName ? decodeURIComponent(categoryName.replace(/-/g, ' ')) : 'Unknown'}
            </h1>

            {loading ? (
                <div className="text-[18px] text-gray-500 text-center py-10">Loading products...</div>
            ) : error ? (
                <div className="text-[18px] text-red-600 text-center py-10">{error}</div>
            ) : products.length === 0 ? (
                <div className="text-[18px] text-gray-700 text-center py-10">
                    No products found in the "{categoryName ? decodeURIComponent(categoryName.replace(/-/g, ' ')) : 'Unknown'}" category.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                    {products.map((item) => (
                        <Product
                            key={item.id}
                            id={item.id}
                            productName={item.productName}
                            discountPrice={item.discountPrice}
                            productImage={item.productImage}
                            rateno={item.rateno}
                            rating={item.ratingStars}
                        />
                    ))}
                </div>
            )}
        </div>
        <Footer />
    </div>
    );
};

export default CategoryDetailPage;
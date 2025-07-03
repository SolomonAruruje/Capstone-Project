import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../Components/Navbar.jsx';
import Footer from '../Components/Footer.jsx';
import Product from './Product.jsx';

const CategoryDetailPage = () => {
  const { keyword } = useParams();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndFilterProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // IMPORTANT: Replace with actual ALL PRODUCTS API endpoint
        const ALL_PRODUCTS_API_ENDPOINT = '/products.json';

        const response = await fetch(ALL_PRODUCTS_API_ENDPOINT);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}. Response: ${errorText}`);
        }

        const allProducts = await response.json();

        // --- Filtering Logic for multiple words (OR Logic) ---
        const lowerCaseKeyword = decodeURIComponent(keyword || '').toLowerCase();

        // Split the keyword into individual terms, handling multiple spaces, and filter out empty terms.
        // For example, "red  shoes" becomes ["red", "shoes"]
        const searchTerms = lowerCaseKeyword.split(/\s+/).filter(term => term.length > 0);

        const results = allProducts.filter(product => {
          // If no search terms are present (e.g., empty search bar submitted), show all products.
          if (searchTerms.length === 0) {
            return true;
          }

          // Combine relevant product fields into a single string for comprehensive searching.
          // .filter(Boolean) removes any null, undefined, or empty string values from the array.
          const searchableProductString = [
            product.productName,
            product.category,
            // Ensure product.id is treated as a string for inclusion
            typeof product.id === 'string' ? product.id : String(product.id),
            product.description, // Include description if it's a field in your product data
            // Add any other product fields here that you want to be searchable (e.g., product.tags)
          ].filter(Boolean).join(' ').toLowerCase();

          // >>> THIS IS THE CHANGE FOR "OR" LOGIC <<<
          // Check if ANY of the search terms are present in the product's combined string.
          return searchTerms.some(term => searchableProductString.includes(term));
        });

        setFilteredProducts(results);

      } catch (err) {
        setError(err.message || 'Failed to fetch or filter products.');
        console.error("Error in CategoryDetailPage:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndFilterProducts();
  }, [keyword]); // Re-run effect if the keyword in the URL changes

  return (
    <>
      <NavBar />
      <div className="container justify-self-center my-[50px]">
        <h1 className="text-3xl font-bold my-6 text-center">
          Results for "{decodeURIComponent(keyword || '')}"
        </h1>

        {loading ? (
          <div className="text-center text-grey-500 font-semibold">Loading products...</div>
        ) : error ? (
          <div className="text-center text-red-600 font-semibold">Error: {error}</div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 justify-items-center">
            {filteredProducts.map(product => (
              <Product
                key={product.id}
                product={product} // Correctly passes the entire product object
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 font-semibold">
            No products found matching "{decodeURIComponent(keyword || '')}".
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CategoryDetailPage;
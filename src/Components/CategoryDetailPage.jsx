import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../Components/Navbar.jsx';
import Footer from '../Components/Footer.jsx';
import Product from './Product.jsx';

const CategoryDetailPage = () => {
  const { keyword } = useParams();

  const [products, setProducts] = useState([]);
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
        setProducts(allProducts); // Store all products (optional, for re-filtering)

        // --- Filtering Logic ---
        const lowerCaseKeyword = decodeURIComponent(keyword || '').toLowerCase(); // Decode and lowercase for comparison

        const results = allProducts.filter(product => {
          // Check product name
          if (product.productName && product.productName.toLowerCase().includes(lowerCaseKeyword)) {
            return true;
          }
          // Check category (if your products have a 'category' field)
          if (product.category && product.category.toLowerCase().includes(lowerCaseKeyword)) {
            return true;
          }
          // Check product ID
          if (product.id && product.id.toLowerCase().includes(lowerCaseKeyword)) {
            return true;
          }
          // Add other fields to search if necessary (e.g., description, tags)
          // if (product.description && product.description.toLowerCase().includes(lowerCaseKeyword)) {
          //   return true;
          // }
          return false;
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
      <div className="container justify-self-center">
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
                product={item}
                // id={product.id}
                // discountPercentage={product.discountPercentage || 0} // Provide default if not always present
                // colour={product.colour || 'N/A'}
                // productName={product.productName}
                // discountPrice={product.discountPrice || product.price || 0}
                // price={product.price}
                // productImage={product.productImage || 'https://placehold.co/150x150?text=No+Image'}
                // rateno={product.rateno || 0}
                // rating={product.ratingStars || 0}
                // description={product.description}
                // state={product.state}
                // img1={product.img1}
                // img2={product.img2}
                // img3={product.img3}
                // img4={product.img4}
                // productcolour1={product.productcolour1}
                // productcolour2={product.productcolour2}
                // productcolour3={product.productcolour3}
                // size={product.size}
                // sizeA={product.sizeA}
                // sizeB={product.sizeB}
                // sizeC={product.sizeC}
                // sizeD={product.sizeD}
                // sizeE={product.sizeE}
                // sizeF={product.sizeF}
                // sizeG={product.sizeG}
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
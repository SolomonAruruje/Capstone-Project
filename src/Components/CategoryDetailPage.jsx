import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../Components/Navbar.jsx';
import Footer from '../Components/Footer.jsx';
import Product from '../Components/Product.jsx';

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
                id={product.id}
                discountPercentage={product.discountPercentage || 0} // Provide default if not always present
                colour={product.colour || 'N/A'}
                productName={product.productName}
                discountPrice={product.discountPrice || product.price || 0}
                price={product.price}
                productImage={product.productImage || 'https://placehold.co/150x150?text=No+Image'}
                rateno={product.rateno || 0}
                rating={product.ratingStars || 0}
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







// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import Product from './Product.jsx';
// import NavBar from './Navbar';
// import Footer from './Footer';

// const CategoryDetailPage = () => {
//     const { categoryName } = useParams();
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchCategoryProducts = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 // Fetch ALL products from backend
//                 const response = await fetch('/products.json')
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 const allProducts = await response.json();

//                 // Filter products by categoryName
//                 const filteredProducts = allProducts.filter(
//                     (product) => product.category && product.category.toLowerCase() === categoryName.toLowerCase()
//                 );

//                 setProducts(filteredProducts);
//             } catch (err) {
//                 console.error(`Failed to fetch products for category ${categoryName}:`, err);
//                 setError(`Failed to load products for "${categoryName}": ${err.message}.`);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCategoryProducts();
//     }, [categoryName]);

//     return (
//         <div>
//             <NavBar />
//         <div className="w-[96%] mx-auto my-8">
//             <h1 className="text-[36px] font-bold mb-6 text-center md:text-left">
//                 Category: {categoryName ? decodeURIComponent(categoryName.replace(/-/g, ' ')) : 'Unknown'}
//             </h1>

//             {loading ? (
//                 <div className="text-[18px] text-gray-500 text-center py-10">Loading products...</div>
//             ) : error ? (
//                 <div className="text-[18px] text-red-600 text-center py-10">{error}</div>
//             ) : products.length === 0 ? (
//                 <div className="text-[18px] text-gray-700 text-center py-10">
//                     No products found in the "{categoryName ? decodeURIComponent(categoryName.replace(/-/g, ' ')) : 'Unknown'}" category.
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
//                     {products.map((item) => (
//                         <Product
//                             key={item.id}
//                             id={item.id}
//                             productName={item.productName}
//                             discountPrice={item.discountPrice}
//                             productImage={item.productImage}
//                             rateno={item.rateno}
//                             rating={item.ratingStars}
//                         />
//                     ))}
//                 </div>
//             )}
//         </div>
//         <Footer />
//     </div>
//     );
// };

// export default CategoryDetailPage;
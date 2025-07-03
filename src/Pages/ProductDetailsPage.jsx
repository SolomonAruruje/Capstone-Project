// src/Pages/ProductDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '../Components/ProductDetails';
import Footer from '../Components/Footer';
import Navbar from '../Components/NavBar';
import RelatedItem from '../Components/RelatedItem';

const ProductDetailsPage = () => {
  // useParams gives us access to URL parameters like ':productId'
  const { productId } = useParams();

  // State to hold the single product data
  const [product, setProduct] = useState(null);

  // State for loading status
  const [loading, setLoading] = useState(true);

  // State for error messages
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true); // Start loading
      setError(null);   // Clear any previous errors

      try {
        // Fetch all products from your JSON file
        const response = await fetch('/products.json');
        if (!response.ok) {
          // If the network response was not ok (e.g., 404, 500)
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const allProducts = await response.json(); // Get the array of all products

        // Find the specific product by matching its ID with the productId from the URL
        const foundProduct = allProducts.find(p => p.id === productId);

        if (foundProduct) {
          setProduct(foundProduct); // Set the state with the found product object
        } else {
          // If no product matches the ID in the URL
          setError("Product not found.");
          setProduct(null); // Ensure product is null if not found
        }

      } catch (err) {
        // Catch any errors during the fetch or JSON parsing
        console.error('Failed to fetch product details:', err);
        setError(`Failed to load product: ${err.message}. Please try again later.`);
        setProduct(null); // Ensure product is null on error
      } finally {
        setLoading(false); // End loading, regardless of success or failure
      }
    };

    // Only fetch if productId exists (it should, due to router config, but good practice)
    if (productId) {
      fetchProductDetails();
    } else {
      // Handle cases where productId might be undefined (e.g., direct access without ID)
      setLoading(false);
      setError("No product ID provided.");
    }

  }, [productId]); // Dependency array: re-run this effect if productId changes

  // --- Conditional Rendering based on state ---

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-[50vh]">
          <p>Loading product details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-[50vh]">
          <p className="text-red-500 text-lg font-medium">{error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  // If no product is found (after loading and no error, but product is null)
  if (!product) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-[50vh]">
          <p>Product data could not be loaded or found.</p>
        </div>
        <Footer />
      </div>
    );
  }

  // If a product is successfully loaded, render ProductDetails with its props
  return (
    <div>
      <Navbar />
      <ProductDetails
        id={product.id}
        img1={product.img1}
        img2={product.img2}
        img3={product.img3}
        img4={product.img4}
        productImage={product.productImage} // Use imageUrl or mainImage, depending on your data structure
        discountPercentage={product.discountPercentage}
        colour={product.colour}
        productName={product.productName}
        oldPrice={product.oldPrice}
        Price={product.Price}
        rateno={product.rateno}
        ratingStars={product.ratingStars}
        description={product.description}
        state={product.state}
        productcolour1={product.productcolour1}
        productcolour2={product.productcolour2}
        productcolour3={product.productcolour3}
        size={product.size}
        sizeA={product.sizeA}
        sizeB={product.sizeB}
        sizeC={product.sizeC}
        sizeD={product.sizeD}
        sizeE={product.sizeE}
        sizeF={product.sizeF}
        sizeG={product.sizeG}
        // Add any other props your ProductDetails component expects from your product object
      />
      <RelatedItem/>
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
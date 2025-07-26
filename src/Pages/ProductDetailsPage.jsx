import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductDetails from '../Components/ProductDetails';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import RelatedItem from '../Components/RelatedItem';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductById = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError('Failed to load product. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchProductById();
  }, [productId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-[50vh]">
          <p>Loading product details...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-[50vh]">
          <p className="text-red-500">{error || 'Product not found.'}</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <ProductDetails product={product} />
      {/* <RelatedItem /> */}
      <Footer />
    </>
  );
};

export default ProductDetailsPage;

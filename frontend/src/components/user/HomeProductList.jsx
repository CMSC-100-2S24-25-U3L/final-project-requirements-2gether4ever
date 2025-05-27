import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../../api/product';
import Product from './HomeProduct';

const HomeProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    'Gulay',
    'Prutas',
    'Karne at Itlog',
    'Bigas at Butil',
    'Mga Gawa sa Sakahan',
    'Organik'
  ];

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();

        const productArray = Array.isArray(data) ? data : data.products || [];
        console.log('✅ Products fetched:', productArray.length);
        setProducts(productArray);
      } catch (err) {
        console.error('❌ Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="pt-10">
      <div className="flex justify-between w-full gap-4">
        {/* first 3 items */}
        {(
          products.slice(0,4).map(product => (
            <Product
              key={product._id}
              product={product}
              addToCart={() => addToCart(product)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomeProductList;
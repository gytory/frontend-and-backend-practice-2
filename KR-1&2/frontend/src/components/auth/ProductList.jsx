import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsAPI } from '../../services/api';

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsAPI.getAll();
        setProducts(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="form-container">Загрузка...</div>;

  return (
    <div>
      <h1>Наша пряжа</h1>
      <div className="products-grid">
        {products.length === 0 ? (
          <p>Нет товаров</p>
        ) : (
          products.map(product => (
            <div key={product.id} className="product-card" onClick={() => navigate(`/products/${product.id}`)}>
              <h3>{product.title}</h3>
              <div className="category">{product.category}</div>
              <div className="price">{product.price} ₽</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
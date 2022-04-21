import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <div className="product-item">
      <div className="product-image">
        <Link to={`/product/${product._id}`}>
          <img src={product.image} variant="top" alt="" />
        </Link>
      </div>
      <div className="product-content">
        <h3>
          <Link
            to={`/product/${product._id}`}
            className="product-title"
            title=""
          >
            {product.name}
          </Link>
        </h3>
        <div className="price">
          <div className="regular-price">
            <span>
              <span className="money">${product.price}</span>
            </span>
          </div>
        </div>
        {product.inventory === 0 ? (
          <span className="regular-price color-red">Out of stock</span>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Product;

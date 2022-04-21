import React, {useState} from 'react';

export const ProductContainer = ({
  product,
  qty,
  setAlert,
  setQty,
  alert,
  availableProducts,
  addToCartHandler,
  adding,
}) => {
  const [symbolsArr] = useState(['e', 'E', '+', '-', '.']);

  return (
    <div className="container">
      <div className="product-template page-content">
        <h2>Product Details</h2>
        <div className="product-details row">
          <div className="product-wrap">
            <div className="product-single">
              <div className="product-media">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <div className="right-side">
                  <span className="product-sku">SKU: {product.sku}</span>
                  <h3 className="product-title main-title">{product.name}</h3>
                  <div className="price">
                    <div className="regular-price">
                      <span>
                        <span className="money">${product.price}</span>
                      </span>
                    </div>
                  </div>
                  <div className="line-item-quantity">
                    <span className="line-item__quantity-text">Quantity :</span>
                    <input
                      type="number"
                      min="1"
                      defaultValue={qty}
                      onKeyDown={e =>
                        symbolsArr.includes(e.key) && e.preventDefault()
                      }
                      onInput={e => {
                        if (
                          e.target.value > product.inventory ||
                          e.target.value === 0
                        ) {
                          setAlert(true);
                        } else {
                          setQty(e.target.value);
                          setAlert(false);
                        }
                      }}
                    />
                  </div>
                  <div className="product-add">
                    {availableProducts === 0 ? (
                      product.inventory ? (
                        <button
                          className="button button--alt"
                          name="add"
                          id="add"
                          disabled={true}>
                          {' '}
                          No Quantity Left{' '}
                        </button>
                      ) : (
                        <button
                          className="button button--alt"
                          name="add"
                          id="add"
                          disabled={true}>
                          {' '}
                          Out of Stock{' '}
                        </button>
                      )
                    ) : product.inventory > 0 ? (
                      alert ? (
                        <button
                          className="button button--alt"
                          name="add"
                          id="add"
                          disabled={alert}>
                          {' '}
                          Only {availableProducts} left{' '}
                        </button>
                      ) : !adding ? (
                        <button
                          className="button button--alt"
                          name="add"
                          id="add"
                          disabled={alert}
                          type="submit"
                          onClick={addToCartHandler}>
                          {' '}
                          Add to Bag{' '}
                        </button>
                      ) : (
                        <button
                          className="button button--alt"
                          name="add"
                          id="add"
                          disabled={alert}
                          type="submit">
                          {' '}
                          Added to Bag{' '}
                        </button>
                      )
                    ) : (
                      <button
                        className="button button--alt"
                        name="add"
                        id="add"
                        disabled={true}>
                        {' '}
                        Out of Stock{' '}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="desc-wrap">
              <h4>Description</h4>
              <div className="detail-desc">{product.description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

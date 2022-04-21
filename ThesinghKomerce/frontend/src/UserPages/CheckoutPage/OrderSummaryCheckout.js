import React from 'react';
import CheckoutProduct from './CheckoutProducts.js';
const OrderSummaryCheckout = ({
  carts,
  itemsCount,
  itemsPrice,
  discountAmount,
  subTotal,
  totalPrice,
}) => {
  return (
    <div className="order-summary-right">
      <div className="order-summary__sections">
        <div className="">
          <div className="order-summary__section__content">
            <table className="product-table">
              <thead className="product-table__header">
                <tr>
                  <th>
                    <span className="visually-hidden">Image</span>
                  </th>
                  <th>
                    <span className="visually-hidden">Description</span>
                  </th>
                  <th>
                    <span className="visually-hidden">Quantity</span>
                  </th>
                  <th>
                    <span className="visually-hidden">Price</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {carts?.map(el => (
                  <CheckoutProduct key={Math.random()} props={el} />
                ))}
              </tbody>
            </table>
          </div>

          <p className="no-margin evenly-align mt-20">
            <span className="cart-total-quantity">{itemsCount} items</span>
            <span className="cart-total-price">
              <span>$ {itemsPrice}</span>
            </span>
          </p>
          {discountAmount ? (
            <div className="cart-subtotal evenly-align cart__total">
              <span className="cart-subtotal__title">Discount</span>
              <strong>
                <span className="cart-subtotal__price">
                  -$ {discountAmount}
                </span>
              </strong>
            </div>
          ) : (
            ''
          )}
          <div className="cart-subtotal evenly-align cart__total">
            <span className="cart-subtotal__title">Subtotal</span>
            <strong>
              <span className="cart-subtotal__price">$ {subTotal}</span>
            </strong>
          </div>
          <div className="cart-subtotal evenly-align cart__total">
            <span className="cart-subtotal__title">Shipping</span>
            <span>
              <span className="cart-subtotal__price">$ 0.00</span>
            </span>
          </div>
          <div className="cart-subtotal evenly-align cart__total">
            <span className="cart-subtotal__title">Taxes</span>
            <span>
              <span className="cart-subtotal__price">$ 0.00</span>
            </span>
          </div>
          <div className="cart__total evenly-align separator">
            <span className="cart__total-text">Total:</span>
            <strong className="cart__total-price text-lg">
              <span>$ {totalPrice}</span>
              <span> USD</span>
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderSummaryCheckout;

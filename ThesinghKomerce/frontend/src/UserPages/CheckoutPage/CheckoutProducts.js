import React from 'react';
const CheckoutProduct = props => {
  const product = props.props.response;
  const qty = props.props.qty;
  const cart = props.props.cartData;

  const productPriceSum = product.price * qty;

  const discountPerItem = product.price * (cart.discountValue / 100) * qty;

  const itemsPrice = qty * product.price;

  const finalAmountPerItem = itemsPrice - discountPerItem;

  return (
    <tr className="product">
      <td className="product__image">
        <div className="product-thumbnail ">
          <div className="product-thumbnail__wrapper">
            <img
              alt={product.name}
              className="product-thumbnail__image"
              src={product.image}
            />
          </div>
          <span className="product-thumbnail__quantity">{qty}</span>
        </div>
      </td>
      <td className="product__description">
        <span className="product__description__name">{product.name}</span>
        <span className="product__description__variant"></span>
        <br />
        <span
          // className="order-list__item-discount-allocation"
          style={{
            fontSize: 12,
            display: 'block',
            lineHeight: '1.2',
            color: '#555',
            margin: '5px 0 0',
          }}>
          {discountPerItem ? (
            <span
              style={{
                fontSize: 12,
                color: '#999',
              }}>
              DISCOUNT (-${discountPerItem})
            </span>
          ) : (
            ''
          )}
        </span>
      </td>
      <td className="product__quantity">
        <span className="visually-hidden">{qty}</span>
      </td>
      <td className="product__price">
        {discountPerItem ? (
          <>
            <span className="order-summary__emphasis">
              ${finalAmountPerItem}
            </span>
            <br />
            <span
              style={{
                fontSize: 14,
                color: '#999',
              }}>
              <s>${productPriceSum}</s>
            </span>
          </>
        ) : (
          <span className="order-summary__emphasis">${productPriceSum}</span>
        )}
      </td>
    </tr>
  );
};
export default CheckoutProduct;

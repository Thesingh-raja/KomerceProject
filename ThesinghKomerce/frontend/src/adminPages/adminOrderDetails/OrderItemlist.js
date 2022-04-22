import React from 'react';

const OrderItemList = ({item}) => {
  return (
    <tr>
      <td>
        <div className="image-wrapper">
          <img
            className="line-item__image"
            src={item.response.image}
            alt={item.response.name}
          />
        </div>
      </td>
      <td>
        <h2 className="line-item-title">
          <span className="cart__product-title">{item.response.name}</span>
        </h2>
        <label htmlFor="">
          SKU: <span>{item.response.sku}</span>
        </label>
      </td>
      <td>
        ${Number(item.response.price)?.toFixed(2)} × <span>{item.qty}</span>
      </td>
      <td>${Number(item.response.price * item.qty)?.toFixed(2)}</td>
    </tr>
  );
};

export default OrderItemList;

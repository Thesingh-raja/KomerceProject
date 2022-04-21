import React from 'react';

export const Address = ({recentOrder}) => {
  return (
    <div className="flex">
      <div className="address">
        <h3>Billing Address</h3>
        <p>{recentOrder?.billingAddress.name}</p>
        <p>{recentOrder?.billingAddress.billingEmail}</p>
        <p>
          {recentOrder?.billingAddress.billingAddress},{' '}
          {recentOrder?.billingAddress.billingPostalCode}
        </p>
        <p className="mt-20">
          <strong>Payment Status: Paid</strong>
        </p>
      </div>
      <div className="address">
        <h3>Shipping Address</h3>
        <p>{recentOrder?.shippingAddress.name}</p>
        <p>{recentOrder?.shippingAddress.shippingEmail}</p>
        <p>
          {recentOrder?.shippingAddress.shippingAddress},{' '}
          {recentOrder?.shippingAddress.shippingPostalCode}
        </p>
        <p className="mt-20">
          <strong>Fulfillment Status: Unfulfilled</strong>
        </p>
      </div>
    </div>
  );
};

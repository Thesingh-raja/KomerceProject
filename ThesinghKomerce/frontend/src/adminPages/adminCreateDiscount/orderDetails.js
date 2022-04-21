import React from 'react';

export const OrderDetails = ({discountValue, startDate, status}) => {
  return (
    <div className="order__details-wrap">
      <h3>Summary</h3>
      {discountValue || startDate ? (
        <>
          <div className="border-t mt-10">
            <div className="flex mt-20">
              <p>
                <strong>Cart Offer</strong>
              </p>
              {status ? (
                <span className="color-green">Active</span>
              ) : (
                <span className="color-green">Inactive</span>
              )}
            </div>
          </div>
          <ul className="list-items">
            {discountValue ? <li>{discountValue}% off products</li> : ''}
            {startDate ? (
              <li>
                Active from{' '}
                {new Date(startDate)?.toLocaleString('en-US', {
                  day: 'numeric',
                  year: 'numeric',
                  month: 'long',
                })}
              </li>
            ) : (
              ''
            )}
          </ul>
        </>
      ) : (
        <p>No Information Entered</p>
      )}
    </div>
  );
};

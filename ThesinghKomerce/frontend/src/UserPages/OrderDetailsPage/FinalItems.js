import React from 'react';
export const FinalItems = ({
  finalItems,
  totalDiscount,
  discountedSubTotal,
  totalPrice,
  recentOrder,
}) => {
  return (
    <tbody>
      {finalItems ? (
        finalItems.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.response.name}</td>
              <td>{item.response.sku}</td>
              {recentOrder.lineItems[index].amount / 100 ===
              item.response.price ? (
                <td className="text-right">
                  <span>${item.response.price?.toFixed(2)}</span>
                </td>
              ) : (
                <td className="text-right">
                  {/* ${recentOrder.lineItems[index].amount / 100}{' '} */}
                  <span>${item.response.price?.toFixed(2)}</span>
                </td>
              )}
              <td>{item.qty}</td>
              <td className="text-right">
                ${(item.response.price * item.qty)?.toFixed(2)}
              </td>
            </tr>
          );
        })
      ) : (
        <tr></tr>
      )}

      <tr>
        <td colSpan="4">Subtotal</td>
        <td className="text-right">${totalPrice}</td>
      </tr>
      <tr>
        <td colSpan="4">Shipping</td>
        <td className="text-right">$0.00</td>
      </tr>
      <tr>
        <td colSpan="4">Tax (GST)</td>
        <td className="text-right">$0.00</td>
      </tr>
      {totalDiscount ? (
        <tr>
          <td colSpan="4">
            Discount{' '}
            <span>
              <strong>({recentOrder?.discountCode})</strong>
            </span>
          </td>
          <td className="text-right">-${totalDiscount.toFixed(2)}</td>
        </tr>
      ) : (
        <tr></tr>
      )}
      <tr>
        <td colSpan="4">
          <strong>Total</strong>
        </td>
        <td className="text-right">
          <strong>
            ${discountedSubTotal} <span>USD</span>
          </strong>
        </td>
      </tr>
    </tbody>
  );
};

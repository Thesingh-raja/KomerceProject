import React from 'react';
import { Link } from 'react-router-dom';
export const DiscountRows = ({ discount }) => {
  const today = new Date().toISOString();
  const startDate = new Date(discount.startDate).toLocaleString('en-US', {
    day: 'numeric',
    year: 'numeric',
    month: 'long',
  });
  const endDate = new Date(discount.endDate).toLocaleString('en-US', {
    day: 'numeric',
    year: 'numeric',
    month: 'long',
  });
  const status =
    today > discount.endDate ? (
      <span className="color-red">Expired</span>
    ) : today < discount.endDate &&
      today > discount.startDate &&
      discount.status ? (
      <span className="color-green">Active</span>
    ) : today < discount.startDate && discount.status ? (
      <span className="">Scheduled</span>
    ) : (
      <span className="color-red">Inactive</span>
    );

  return (
    <tr key={discount._id}>
      <td>
        <Link to={`/admin/discount/${discount._id}/edit`}>
          <u>{discount.discountCode}</u>
        </Link>
        <p>{discount.discountValue}% off one-time purchase products</p>
      </td>
      <td>
        <span>{discount.timesUsed}</span> used
      </td>
      <td>{startDate}</td>

      <td>{endDate}</td>
      <td>{status}</td>
    </tr>
  );
};

import React from 'react';
import {Link} from 'react-router-dom';
export const Nav = () => {
  return (
    <div className="admin-left-nav mt-20">
      <ul>
        <li>
          <Link to="/admin/productlist">Products</Link>
        </li>
        <li>
          <Link className="active" to="/admin/orderlist">
            Orders
          </Link>
        </li>
        <li>
          <Link to="/admin/discountlist">Discount</Link>
        </li>
      </ul>
    </div>
  );
};

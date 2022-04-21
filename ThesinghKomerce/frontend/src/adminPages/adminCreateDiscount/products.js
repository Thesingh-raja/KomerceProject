import React from 'react';
import {Link} from 'react-router-dom';
export const Products = ({product, index, selectBoxHandler}) => {
  return (
    <tr key={index}>
      <td>
        <input
          type="checkbox"
          name="prod-item"
          onChange={() =>
            selectBoxHandler(product._id, product.name, product.image)
          }
        />
      </td>
      <td>
        <span className="admin-list-img">
          <img src={product.image} alt={product.name} />
        </span>
      </td>
      <td>
        <div className="">
          <Link to={`/admin/product/${product._id}/edit`}>
            <u>{product.name}</u>
          </Link>
        </div>
        <span>
          SKU: <span>{product.sku}</span>
        </span>
      </td>
      <td>${product.price}</td>
      <td>{product.inventory}</td>
    </tr>
  );
};

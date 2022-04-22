import React from 'react';
import {Link} from 'react-router-dom';

export const Modal = props => {
  return (
    <div id="show-modal">
      <div className="overlay"></div>
      <div className="admin-right page-content">
        <div className="products-list">
          <div className="actions flex items-center">
            <h3>Select products</h3>
          </div>
          <div className="added-products border-t">
            <div className="overflow-auto">
              <table className="table mt-20">
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Inventory</th>
                  </tr>
                </thead>
                <tbody>
                  {props.products
                    ?.filter(x => props.productFilter(x._id))
                    .map((product, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="checkbox"
                            name="prod-item"
                            onChange={() =>
                              props.selectBoxHandler(
                                product._id,
                                product.name,
                                product.image
                              )
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
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-20">
            <button
              className="button button--hollow"
              onClick={() => props.addProdHandler()}>
              Apply
            </button>
            <button
              className="button update_btn"
              id="close-modal"
              onClick={e => props.hideModal()}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

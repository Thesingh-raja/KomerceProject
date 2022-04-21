import React from 'react';
import {useSelector} from 'react-redux';
import {Products} from './products';
export const Modal = ({
  selectBoxHandler,
  addProdHandler,
  hideModal,
  productFilter,
}) => {
  const {products} = useSelector(state => state.productList);

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
                  {products
                    ?.filter(x => productFilter(x._id))
                    .map((product, index) => (
                      <Products
                        product={product}
                        index={index}
                        selectBoxHandler={selectBoxHandler}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-20">
            <button
              className="button button--hollow"
              onClick={() => addProdHandler()}>
              Apply
            </button>
            <button
              className="button update_btn"
              id="close-modal"
              onClick={e => hideModal()}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

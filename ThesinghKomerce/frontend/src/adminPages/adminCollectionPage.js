import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {listProducts} from '../actions/productActions';

const AdminCollectionPage = ({history}) => {
  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const {products} = productList;
  const {userInfo} = useSelector(state => state.userLogin);
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/');
    } else {
      dispatch(listProducts());
    }
  }, [dispatch, history, userInfo]);

  return (
    <section className="flex">
      <div className="container-fluid">
        <div className="admin-content">
          <div className="admin-left-nav mt-20">
            <ul>
              <li>
                <Link className="active" to="/admin/productlist">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/admin/orderlist">Orders</Link>
              </li>
              <li>
                <Link to="/admin/discountlist">Discount</Link>
              </li>
            </ul>
          </div>
          <div className="admin-right page-content">
            <div className="products-list">
              <div className="actions flex items-center">
                <h3>Products</h3>
                <Link
                  to={`/admin/product/create`}
                  className="button button--hollow  justify-end inline-block">
                  Add Product
                </Link>
              </div>

              <div className="added-products">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product Name</th>
                      <th>SKU</th>
                      <th>Price</th>
                      <th>Inventory</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product._id}>
                        <td>
                          <span className="admin-list-img">
                            <img src={product.image} alt="" />
                          </span>
                        </td>
                        <td>
                          <div className="">
                            <Link to={`/admin/product/${product._id}/edit`}>
                              <u>{product.name}</u>
                            </Link>
                          </div>
                        </td>
                        <td>{product.sku}</td>
                        <td>${product.price}</td>
                        <td>{product.inventory}</td>
                        {product.status ? (
                          <td className="color-green">Active</td>
                        ) : (
                          <td className="color-red">Inactive</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AdminCollectionPage;
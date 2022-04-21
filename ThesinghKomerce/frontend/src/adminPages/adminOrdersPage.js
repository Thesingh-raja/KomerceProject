import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {listOrders} from '../actions/orderActions';
const AdminOrdersPage = ({history}) => {
  const dispatch = useDispatch();

  const {orders} = useSelector(state => state.orderList);

  const {userInfo} = useSelector(state => state.userLogin);

  useEffect(() => {
    if (userInfo) dispatch(listOrders());
  }, [dispatch, history, userInfo]);
  // }, []);

  return (
    <section className="flex">
      <div className="container-fluid">
        <div className="admin-content">
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
          <div className="admin-right page-content">
            <div className="products-list">
              <div className="actions flex items-center">
                <h3>Orders</h3>
              </div>
              <div className="added-products">
                <table className="table">
                  <thead>
                    <tr>
                      <th>S. No</th>
                      <th>Order No.</th>
                      <th>Date</th>
                      <th>Payment Status</th>
                      <th>Fulfillment Status</th>
                      <th>Items</th>
                      <th className="text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders
                      ?.filter(x => x.isPaid === true)
                      ?.map((order, index) => {
                        const noOfItems = Object.values(
                          order.orderItems[0]
                        ).reduce((acc, item) => acc + item.qty, 0);

                        return (
                          <tr key={index}>
                            <td>{(index + 1).toString().padStart(2, 0)}</td>
                            <td>
                              <Link to={`/admin/order/${order._id}`}>
                                <u>#{order.orderNo}</u>
                              </Link>
                            </td>
                            <td>{moment(order.paidAt).format('ll')}</td>
                            <td>{order.isPaid ? 'Paid' : 'Not Paid'}</td>
                            <td>Unfulfilled</td>
                            <td>{noOfItems} items</td>
                            <td className="text-right">${order.totalPrice}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AdminOrdersPage;

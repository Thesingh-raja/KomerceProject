import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getOrderDetailsByUserId} from '../actions/orderActions';
import {Link} from 'react-router-dom';
import Lottie from 'react-lottie';
import {defaultOptions4} from '../lotties/defaultOption';
import moment from 'moment';
const OrderListPage = ({match, history}) => {
  const dispatch = useDispatch();
  const [splash, setSplash] = useState(false);
  useEffect(() => {
    setSplash(true);
    setTimeout(() => setSplash(false), 800);
  }, [match]);
  const {userInfo} = useSelector(state => state.userLogin);
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) history.push('/');
  }, [userInfo, history]);
  const {order} = useSelector(state => state.orderListUser);
  useEffect(() => {
    if (userInfo && userInfo._id)
      dispatch(getOrderDetailsByUserId(userInfo._id));
  }, [match, dispatch, userInfo]);
  return (
    <section>
      {splash ? (
        <Lottie options={defaultOptions4} height={400} width={400} />
      ) : (
        <div className="container">
          {order?.length ? (
            <div className="checkout-template page-content">
              <h2>My Orders</h2>
              <div className="my-orders row">
                <div className="orders-wrap">
                  <div className="orders-list">
                    <table>
                      <thead>
                        <tr>
                          <th>S. No</th>
                          <th>Order No.</th>
                          <th>Date</th>
                          <th>Payment Status</th>
                          <th>Fulfillment Status</th>
                          <th className="text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order
                          ?.filter(item => item.isPaid)
                          .map((item, index) => (
                            <tr key={index}>
                              <td>{(index + 1).toString().padStart(2, 0)}</td>
                              <td>
                                <Link to={`/order-details/${item._id}`}>
                                  <u>#{item.orderNo}</u>
                                </Link>
                              </td>
                              {/* <td>{new Date(item.paidAt).toDateString()}</td> */}
                              <td>{moment(item.paidAt).format('ll')}</td>
                              <td>{item.isPaid ? 'Paid' : 'Not paid'}</td>
                              <td>Unfulfilled</td>
                              <td className="text-right">${item.totalPrice}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="align-notFound">
              Looks like you haven't made your order yet
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default OrderListPage;

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getOrderDetails} from '../../actions/orderActions';
import {getStripeLineItems} from '../../actions/stripeActions';
import moment from 'moment';
import Lottie from 'react-lottie';
import {defaultOptions4} from '../../lotties/defaultOption';
import {FinalItems} from './FinalItems';
import {Address} from './Address';
const OrderDetailsPage = ({match, history}) => {
  const dispatch = useDispatch();
  const [splash, setSplash] = useState(false);
  const orderId = match.params.id;
  const {userInfo} = useSelector(state => state.userLogin);
  const {recentOrder} = useSelector(state => state.orderDetailRecent);
  const items = recentOrder?.orderItems[0];
  let finalItems;
  if (items) finalItems = Object.values(items);
  const discountedSubTotal = (
    recentOrder?.lineItems?.reduce(
      (acc, item) => acc + item.amount * item.quantity,
      0
    ) / 100
  ).toFixed(2);
  const totalPrice = finalItems
    ?.reduce((acc, item) => acc + item.qty * item.response.price, 0)
    .toFixed(2);
  const totalDiscount = totalPrice - discountedSubTotal;
  const stripeId = recentOrder?.paymentResult?.id;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) history.push('/');
  }, [userInfo, history]);
  useEffect(() => {
    if (userInfo && stripeId) dispatch(getStripeLineItems(stripeId));
  }, [stripeId, userInfo, match, dispatch]);
  useEffect(() => {
    setSplash(true);
    setTimeout(() => setSplash(false), 800);
  }, [match]);
  useEffect(() => {
    if (userInfo) dispatch(getOrderDetails(orderId));
  }, [match, userInfo, orderId, dispatch]);

  return (
    <section>
      {splash ? (
        <Lottie options={defaultOptions4} height={400} width={400} />
      ) : (
        <div className="container">
          <div className="checkout-template page-content">
            <h2>Order # {recentOrder?.orderNo}</h2>
            <p>Placed on {moment(recentOrder?.createdAt).format('ll')}</p>
            <div className="mt-20">
              <Address recentOrder={recentOrder} />
            </div>
            <div className="my-orders row">
              <div className="orders-wrap">
                <div className="orders-list">
                  <table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>SKU</th>
                        <th className="text-right">Price</th>
                        <th>Quantity</th>
                        <th className="text-right">Total</th>
                      </tr>
                    </thead>
                    <FinalItems
                      finalItems={finalItems}
                      totalDiscount={totalDiscount}
                      discountedSubTotal={discountedSubTotal}
                      totalPrice={totalPrice}
                      recentOrder={recentOrder}
                    />
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default OrderDetailsPage;

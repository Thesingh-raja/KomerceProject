import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {getOrderDetails} from '../actions/orderActions';
import {getStripeSessionDetails} from '../actions/stripeActions';
import {clearCart} from '../actions/cartActions';
import {OrderEmail} from './emailTemplate/emailTemplate.js';
import axios from 'axios';
import ReactDOMServer from 'react-dom/server';
import Lottie from 'react-lottie';
import {session as sess} from '../actions/userActions';
import {defaultOptions4} from '../lotties/defaultOption';

const OrderSuccessPage = history => {
  const dispatch = useDispatch();
  const [splash, setSplash] = useState(false);

  useEffect(() => {
    dispatch(sess());
  }, []);

  useEffect(() => {
    setSplash(true);
    setTimeout(() => {
      setSplash(false);
    }, 2000);
  }, [history]);

  const sessionId = history.match.params.id;
  const {session} = useSelector(state => state.sessionDetails);
  const {userInfo} = useSelector(state => state.userLogin);
  const recentOrder = useSelector(state => state.orderDetailRecent);
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) history.history.push('/');
  }, [userInfo, history]);
  useEffect(() => {
    if (userInfo && session) {
      dispatch(getOrderDetails(session._id));
    }
  }, [session, userInfo]);

  useEffect(() => {
    if (userInfo) dispatch(getStripeSessionDetails(sessionId));
  }, [sessionId, userInfo]);

  useEffect(() => {
    if (userInfo && session && session.inventoryReduced) {
      const html = ReactDOMServer.renderToString(
        <OrderEmail session={session} />
      );
      const body = {html: html, to: session.shippingAddress.shippingEmail};
      axios.post('/api/orders/order-email', body);
    }
  }, [session, userInfo]);

  useEffect(() => {
    if (userInfo) dispatch(clearCart(userInfo._id));
    // }, [history]);
  }, [userInfo, history]);

  return (
    <section>
      <div className="container">
        {splash ? (
          <Lottie options={defaultOptions4} height={400} width={400} />
        ) : (
          <div className="checkout-template page-content">
            <h2>Thank you</h2>
            <div className="checkout-details row">
              <div className="checkout-wrap">
                <div className="checkout-section">
                  <div className="contact-info">
                    <div className="fieldset">
                      <h3>Order Placed</h3>
                      <p className="mt-20">Thank you for placing your order.</p>
                      <p className="mt-20">
                        Your order no.:{' '}
                        <Link to={`/order-details/${session?._id}`}>
                          {' '}
                          <u>{recentOrder.recentOrder?.orderNo}</u>
                        </Link>
                        . You can check your order{' '}
                        <Link to={`/order-details/${session?._id}`}>
                          <u>details</u>
                        </Link>{' '}
                        here.
                      </p>
                    </div>

                    <div className="action-btn">
                      <Link to="/order-list">
                        <button className="button button--hollow ">
                          My Orders
                        </button>
                      </Link>
                      <Link to="/">
                        <button className="button">Continue Shopping</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default OrderSuccessPage;

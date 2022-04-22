import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getOrderDetails} from '../../actions/orderActions';
import moment from 'moment';
import OrderItemlist from './OrderItemlist';
import {Nav} from './Nav';
import {RightSideBox} from './RightSideBox';
const AdminOrderDetailsPage = ({match}) => {
  const dispatch = useDispatch();
  const orderId = match.params.id;
  const {recentOrder} = useSelector(state => state.orderDetailRecent);
  const {userInfo} = useSelector(state => state.userLogin);

  const items = recentOrder?.orderItems[0];
  let finalItems;
  if (items) finalItems = Object.values(items);
  const itemsCount = finalItems?.reduce((acc, item) => acc + item.qty, 0);
  const subTotal = finalItems
    ?.reduce((acc, item) => acc + item.qty * item.response.price, 0)
    .toFixed(2);
  const totalPrice = recentOrder?.totalPrice;
  const discountAmount = subTotal - totalPrice;

  useEffect(() => {
    if (userInfo && orderId) dispatch(getOrderDetails(orderId));
  }, [match, userInfo]);

  return (
    <section className="flex">
      <div className="container-fluid">
        <div className="admin-content">
          <Nav />
          <div className="admin-right page-content">
            <div className="products-list">
              <div className="actions flex items-center">
                <h3>#{recentOrder?.orderNo}</h3>
              </div>
              <div className="actions flex items-center flex-start">
                <span>{moment(recentOrder?.paidAt).format('lll')}</span>
              </div>
              <div className="view-orders">
                <div className="main-cart-wrapper">
                  <div className="cart__items cart__block">
                    <div className="line-items">
                      <table className="table">
                        <tbody>
                          {finalItems?.map((item, index) => (
                            <OrderItemlist key={index} item={item} />
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="order__details-wrap mt-10">
                      <div className="flex">
                        <h4>Paid</h4>
                      </div>
                      <div className="flex border-t">
                        <span>Subtotal</span>
                        <span>{itemsCount} item</span>
                        <span>${Number(subTotal)?.toFixed(2)}</span>
                      </div>
                      <div className="flex">
                        <span>Shipping</span>
                        <span>$0.00</span>
                      </div>
                      <div className="flex">
                        <span>Tax</span>
                        <span>$0.00</span>
                      </div>
                      {discountAmount ? (
                        <div className="flex">
                          <span>
                            Discount{' '}
                            <strong>({recentOrder?.discountCode})</strong>
                          </span>
                          <span>-${Number(discountAmount).toFixed(2)} </span>
                        </div>
                      ) : (
                        ''
                      )}
                      <div className="flex">
                        <span>
                          <strong>Total</strong>
                        </span>
                        <span>
                          <strong>${Number(totalPrice)?.toFixed(2)}</strong>
                        </span>
                      </div>
                      <div className="flex border-t">
                        <span>Paid by customer</span>
                        <span>
                          ${Number(recentOrder?.totalPrice)?.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <RightSideBox recentOrder={recentOrder} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AdminOrderDetailsPage;

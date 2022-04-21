import React, {useEffect} from 'react';
import {getOrderDetailsByUserId} from '../../actions/orderActions';
import {useDispatch, useSelector} from 'react-redux';

export const RightSideBox = ({recentOrder}) => {
  const dispatch = useDispatch();
  const {order} = useSelector(state => state.orderListUser);
  const {userInfo} = useSelector(state => state.userLogin);
  useEffect(() => {
    if (userInfo && recentOrder?.user)
      dispatch(getOrderDetailsByUserId(recentOrder?.user));
  }, [recentOrder?.user, userInfo]);
  const noOfOrders = order?.filter(el => el.isPaid === true)?.length;
  return (
    <div className="cart__details cart__block add-margin">
      <div className="order__details-wrap">
        <h4>Customer</h4>
        <p>{recentOrder?.billingAddress?.name}</p>
        <p>{noOfOrders} orders</p>
      </div>
      <div className="order__details-wrap mt-10">
        <div className="flex">
          <h4>Contact Information</h4>
        </div>
        <p>{recentOrder?.billingAddress?.billingEmail}</p>
        <p>{recentOrder?.billingAddress?.billingPhone}</p>
      </div>
      <div className="order__details-wrap mt-10">
        <div className="flex">
          <h4>Shipping Address</h4>
        </div>
        <p>{recentOrder?.shippingAddress?.name}</p>
        <p>{recentOrder?.shippingAddress?.shippingAddress}</p>
        <p>{recentOrder?.shippingAddress?.shippingPostalCode}</p>
      </div>
    </div>
  );
};

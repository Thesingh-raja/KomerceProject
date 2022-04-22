import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CheckoutForm} from './CheckoutForm';
import {getDiscountDetailById} from '../../actions/discountActions';
import OrderSummaryCheckout from './OrderSummaryCheckout.js';
import Lottie from 'react-lottie';
import {defaultOptions4} from '../../lotties/defaultOption';
import {getCartDetails} from '../../actions/cartActions';
import {increaseReducedQuantity} from '../../actions/stripeActions';

const CheckoutPage = ({match, history}) => {
  const dispatch = useDispatch();
  const {carts} = useSelector(state => state.cartlist);
  const {userInfo} = useSelector(state => state.userLogin);
  const {discount} = useSelector(state => state.discountDetails);
  const {status, discount: discountDetail} = discount;

  const discountCode =
    userInfo && discountDetail && discountDetail?.discountCode
      ? discountDetail.discountCode
      : 'Not Applicable';

  const id = match.params.id;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) history.push('/');
  }, [userInfo, history]);

  useEffect(() => {
    if (userInfo && userInfo._id !== id) {
      dispatch(increaseReducedQuantity(id));
    }
  }, [match, userInfo]);
  const [splash, setSplash] = useState(false);
  useEffect(() => {
    setSplash(true);
    setTimeout(() => setSplash(false), 800);
  }, [history]);
  let discountAmount = 0;
  const itemsCount = carts?.reduce((acc, item) => acc + item.qty, 0);
  const itemsPrice = carts
    ?.reduce((acc, item) => acc + item.qty * item.response.price, 0)
    .toFixed(2);
  const subTotal = carts
    ?.reduce(
      (acc, item) =>
        acc +
        item.qty *
          item.response.price *
          ((100 - item.cartData.discountValue) / 100),
      0
    )
    .toFixed(2);
  discountAmount = itemsPrice - subTotal;
  const totalPrice = subTotal;
  useEffect(() => {
    if (userInfo) dispatch(getCartDetails(userInfo._id));
  }, [userInfo, history]);
  useEffect(() => {
    if (userInfo) {
      if (carts && carts.length && carts[0]?.cartData) {
        const fetch = async () => {
          dispatch(getDiscountDetailById(carts[0]?.cartData.discount));
        };
        if (carts[0]?.cartData.discount) fetch();
      }
    }
  }, [carts, userInfo]);
  useEffect(() => {
    if (userInfo) {
      dispatch(getCartDetails(userInfo._id));
    }
  }, [status, userInfo]);

  return (
    <section>
      <div className="container">
        {splash ? (
          <Lottie options={defaultOptions4} height={400} width={400} />
        ) : (
          <div className="checkout-template page-content">
            <h2>Checkout</h2>
            <div className="checkout-details row">
              <div className="checkout-wrap">
                <div className="checkout-section">
                  <CheckoutForm id={id} />
                  <OrderSummaryCheckout
                    carts={carts}
                    itemsCount={itemsCount}
                    itemsPrice={itemsPrice}
                    discountAmount={discountAmount}
                    discountCode={discountCode}
                    subTotal={subTotal}
                    totalPrice={totalPrice}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default CheckoutPage;

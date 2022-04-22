import {createOrder} from '../../actions/orderActions';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useStripe} from '@stripe/react-stripe-js';
import {Link} from 'react-router-dom';
import {createStripeSession} from '../../actions/stripeActions';
import {userAddressInfo, updateAddressInfo} from '../../actions/userActions';
import {
  getCartDetails,
  updateDiscountValueToCart,
} from '../../actions/cartActions';
import {toast} from 'react-toastify';

export const CheckoutForm = ({id}) => {
  const stripe = useStripe();
  const dispatch = useDispatch();
  const {carts} = useSelector(state => state.cartlist);
  const {userInfo} = useSelector(state => state.userLogin);
  const {loading, address} = useSelector(state => state.userAddress);
  const {success, order} = useSelector(state => state.orderCreate);
  const {sessionCreated, session} = useSelector(state => state.sessionCreate);
  const {discount} = useSelector(state => state.discountDetails);
  const {status, discount: discountDetail} = discount;

  const discountCode =
    userInfo && discountDetail && discountDetail?.discountCode
      ? discountDetail.discountCode
      : 'Not Applicable';

  let discountAmount = 0;
  let value = 0;
  useEffect(() => {
    if (userInfo) {
      if (status && discountDetail && discountDetail.isApplicableToAll) {
        value = Number(discountDetail?.discountValue) / 100;
        discountAmount = carts
          ?.reduce(
            (acc, item) => acc + item.qty * item.response.price * value,
            0
          )
          .toFixed(2);
      } else if (
        status &&
        discountDetail &&
        !discountDetail.isApplicableToAll
      ) {
        //specific products
        const specificProductsId = discountDetail.specificProducts.map(
          prod => prod.prodId
        );
        //update discount value to cart model of specific products
        dispatch(
          updateDiscountValueToCart(
            specificProductsId,
            discountDetail.discountValue
          )
        );
      }
    }
  }, [discountDetail, userInfo]);

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

  let billingAddress, shippingAddress;
  if (!loading && address) {
    billingAddress = address[0]?.billingAddress;
    shippingAddress = address[0]?.shippingAddress;
  }
  const [billingInfo, setBillingInfo] = useState({
    name: '',
    billingEmail: '',
    billingPhone: '',
    billingAddress: '',
    billingPostalCode: '',
  });
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    shippingEmail: '',
    shippingPhone: '',
    shippingAddress: '',
    shippingPostalCode: '',
  });
  useEffect(() => {
    if (userInfo) setBillingInfo(billingAddress);
  }, [billingAddress, userInfo]);
  useEffect(() => {
    if (userInfo) setShippingInfo(shippingAddress);
  }, [shippingAddress, userInfo]);

  const line_items = carts?.map(cart => {
    const amount =
      cart.response.price * 100 -
      cart.response.price * cart.cartData.discountValue;
    return {
      name: cart.response.name,
      description: cart.response.description,
      amount,
      currency: 'usd',
      quantity: cart.qty,
    };
  });

  const orderz = {
    discountCode,
    orderItems: {...carts},
    lineItems: line_items,
    shippingAddress: shippingInfo,
    billingAddress: billingInfo,
    paymentMethod: 'stripe',
    itemsPrice: itemsPrice,
    taxPrice: 0,
    shippingPrice: 0,
    totalPrice: totalPrice,
  };
  const addressInfo = [billingInfo, shippingInfo];

  useEffect(() => {
    if (userInfo && id !== userInfo._id) {
      dispatch(userAddressInfo(addressInfo));
    }
  }, [userInfo, dispatch, id]);

  useEffect(() => {
    if (userInfo) dispatch(getCartDetails(userInfo._id));
  }, [userInfo, dispatch]);

  useEffect(() => {
    if (userInfo && sessionCreated) {
      const sessionId = session.session.id;
      const {error} = stripe.redirectToCheckout({sessionId});
      if (error) {
        console.error(error);
      }
    }
  }, [sessionCreated]);

  useEffect(() => {
    if (userInfo && success) {
      dispatch(
        createStripeSession(order.data._id, {
          line_items,
          orderItems: {...carts},
        })
      );
    }
  }, [success]);

  const checkoutHandler = e => {
    e.preventDefault();
    if (itemsPrice > 0) {
      dispatch(createOrder(orderz));
      dispatch(updateAddressInfo(addressInfo));
    } else toast.warn('Payment amount should be greater than zero');
  };

  const [symbolsArr] = useState(['e', 'E', '+', '-', '.']);

  return (
    <form className="contact-info" onSubmit={checkoutHandler}>
      <div className="fieldset">
        <h3>Contact Information</h3>
        <div className="field-input">
          <label htmlFor="name">Name</label>
          <span>
            <input
              type="text"
              className="input-text"
              value={billingInfo?.name}
              onChange={e => {
                setBillingInfo({
                  ...billingInfo,
                  name: e.target.value.replace(/[^A-Za-z .]/gi, ''),
                });
              }}
              placeholder="Enter your name"
              required
            />
          </span>
        </div>
        <div className="field-input">
          <label htmlFor="name">Email Id</label>
          <span>
            <input
              type="email"
              className="input-text"
              value={billingInfo?.billingEmail}
              onChange={e => {
                setBillingInfo({
                  ...billingInfo,
                  billingEmail: e.target.value,
                });
              }}
              placeholder="Enter your email id"
              required
            />
          </span>
        </div>
        <div className="field-input">
          <label htmlFor="name">Phone</label>
          <span className="phone">
            <input
              type="number"
              className="input-text"
              value={billingInfo?.billingPhone}
              onKeyDown={e => symbolsArr.includes(e.key) && e.preventDefault()}
              onChange={e => {
                setBillingInfo({
                  ...billingInfo,
                  billingPhone: e.target.value,
                });
              }}
              placeholder="Enter your phone no."
              required
            />
          </span>
        </div>
        <div className="field-input">
          <label htmlFor="name">Address</label>
          <span>
            <input
              type="text"
              className="input-text"
              value={billingInfo?.billingAddress}
              onChange={e => {
                setBillingInfo({
                  ...billingInfo,
                  billingAddress: e.target.value,
                });
              }}
              placeholder="Enter your address"
              required
            />
          </span>
        </div>
        <div className="field-input">
          <label htmlFor="name">Postal Code</label>
          <span className="phone">
            <input
              type="number"
              className="input-text"
              value={billingInfo?.billingPostalCode}
              onKeyDown={e => symbolsArr.includes(e.key) && e.preventDefault()}
              onChange={e => {
                setBillingInfo({
                  ...billingInfo,
                  billingPostalCode: e.target.value,
                });
              }}
              placeholder="Enter your postal code"
              required
            />
          </span>
        </div>
      </div>

      <div className="fieldset">
        <h3>Shipping Address</h3>
        <div className="field-input">
          <label htmlFor="name">Name</label>
          <span>
            <input
              type="text"
              className="input-text"
              value={shippingInfo?.name}
              onChange={e => {
                setShippingInfo({
                  ...shippingInfo,
                  name: e.target.value.replace(/[^A-Za-z .]/gi, ''),
                });
              }}
              placeholder="Enter your name"
              required
            />
          </span>
        </div>
        <div className="field-input">
          <label htmlFor="name">Email Id</label>
          <span>
            <input
              type="email"
              className="input-text"
              value={shippingInfo?.shippingEmail}
              onChange={e => {
                setShippingInfo({
                  ...shippingInfo,
                  shippingEmail: e.target.value,
                });
              }}
              placeholder="Enter your email id"
              required
            />
          </span>
        </div>
        <div className="field-input">
          <label htmlFor="name">Phone</label>
          <span className="phone">
            <input
              type="number"
              id="num"
              className="input-text"
              value={shippingInfo?.shippingPhone}
              onKeyDown={e => symbolsArr.includes(e.key) && e.preventDefault()}
              onChange={e => {
                setShippingInfo({
                  ...shippingInfo,
                  shippingPhone: e.target.value,
                });
              }}
              placeholder="Enter your phone no."
              required
            />
          </span>
        </div>
        <div className="field-input">
          <label htmlFor="name">Address</label>
          <span>
            <input
              type="text"
              className="input-text"
              value={shippingInfo?.shippingAddress}
              onChange={e => {
                setShippingInfo({
                  ...shippingInfo,
                  shippingAddress: e.target.value,
                });
              }}
              placeholder="Enter your address"
              required
            />
          </span>
        </div>
        <div className="field-input">
          <label htmlFor="name">Postal Code</label>
          <span className="phone">
            <input
              type="number"
              className="input-text"
              value={shippingInfo?.shippingPostalCode}
              onKeyDown={e => symbolsArr.includes(e.key) && e.preventDefault()}
              onChange={e => {
                setShippingInfo({
                  ...shippingInfo,
                  shippingPostalCode: e.target.value,
                });
              }}
              placeholder="Enter your postal code"
              required
            />
          </span>
        </div>
      </div>
      <div className="action-btn">
        <button type="submit" className="button button--hollow ">
          Proceed to Payment
        </button>
        <Link to="/cart">
          <button className="button">Return to Cart</button>
        </Link>
      </div>
    </form>
  );
};

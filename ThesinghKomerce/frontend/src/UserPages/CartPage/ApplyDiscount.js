import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getDiscountDetailsByCode} from '../../actions/discountActions';
import {
  removeDiscountFromCart,
  updateDiscountToCart,
} from '../../actions/cartActions';
import {toast} from 'react-toastify';

export const ApplyDiscount = ({history}) => {
  const dispatch = useDispatch();

  const {discount} = useSelector(state => state.discountDetails);
  const {userInfo} = useSelector(state => state.userLogin);
  const {status, discount: discountDetail} = discount;
  const [code, setCode] = useState();
  let discountId;
  let coupon;

  if (discountDetail) coupon = discountDetail?.discountCode;

  useEffect(() => {
    if (userInfo && discountDetail) {
      discountId = discountDetail?._id;
      if (discountId) dispatch(updateDiscountToCart(discountId));
    }
  }, [discountDetail]);

  const validateDiscount = code => {
    if (code) dispatch(getDiscountDetailsByCode(code));
    else {
      toast.clearWaitingQueue();
      toast.warn('Enter a Coupon Code', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 800,
      });
    }
  };

  const removeDiscount = () => {
    dispatch(getDiscountDetailsByCode());
    dispatch(removeDiscountFromCart());
  };

  return (
    <div className="cart-promo">
      <>
        {!status ? (
          <>
            <h5 className="enter-code">ENTER A PROMO CODE</h5>
            <input
              type="text"
              onChange={e => {
                setCode(e.target.value);
              }}
              id="devPromo"
            />
            <span
              className="apply-coupon"
              onClick={() => validateDiscount(code)}>
              Apply Coupon
            </span>
          </>
        ) : (
          <>
            <span className="coupon-success">Coupon Applied Successfully!</span>
            <div className="valid-coupon">
              <h4>{coupon}</h4>
            </div>
            <span className="apply-coupon" onClick={() => removeDiscount()}>
              Remove Coupon
            </span>
          </>
        )}
      </>
    </div>
  );
};

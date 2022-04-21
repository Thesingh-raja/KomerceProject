import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {CartProducts} from './cartProducts';
import {ApplyDiscount} from './ApplyDiscount';
import Lottie from 'react-lottie';
import {defaultOptions1} from '../../lotties/defaultOption.js';
import {defaultOptions3} from '../../lotties/defaultOption.js';
import {
  getCartDetails,
  updateDiscountValueToCart,
  overAllUpdateQty,
} from '../../actions/cartActions';
import {getDiscountDetailById} from '../../actions/discountActions';

const CartPage = ({history}) => {
  let available = [];
  const [cartProd, setCartProd] = useState();

  const overallUpdateCart = (id, qnty) => {
    let updateObject = {id: id, qty: qnty};
    available = available.filter(el => el.id !== updateObject.id);
    available.push(updateObject);
  };

  const lastUpdate = () => {
    if (available.length) dispatch(overAllUpdateQty(available));
  };

  const {updateSuccess} = useSelector(state => state.overAllUpdate);
  const {cartListLoading, carts} = useSelector(state => state.cartlist);
  const {userInfo} = useSelector(state => state.userLogin);
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) history.push('/');
  }, [userInfo, history]);
  useEffect(() => {
    if (userInfo && carts) setCartProd(carts);
  }, [carts, userInfo]);

  const {cartRemoved} = useSelector(state => state.cartItemRemove);
  const {cartUpdateLoading} = useSelector(state => state.cartUpdate);
  const {loading, discount} = useSelector(state => state.discountDetails);
  const {status, discount: discountDetail} = discount;

  const dispatch = useDispatch();

  const [wholeCartLoading, setWholeCartLoading] = useState(true);

  useEffect(() => {
    if (userInfo && !discountDetail && carts) {
      dispatch(getDiscountDetailById(carts[0]?.cartData.discount));
    }
  }, [carts, userInfo]);

  useEffect(() => {
    setTimeout(() => {
      setWholeCartLoading(false);
    }, 800);
  }, []);

  let discountAmount = 0;
  let value = 0;
  useEffect(() => {
    if (userInfo) {
      if (status && discountDetail && discountDetail.isApplicableToAll) {
        value = Number(discountDetail?.discountValue) / 100;
        dispatch(updateDiscountValueToCart('', discountDetail.discountValue));
        discountAmount = carts
          ?.reduce(
            (acc, item) => acc + item.qty * item.response.price * value,
            0
          )
          .toFixed(2);
        dispatch(getCartDetails(userInfo._id));
      } else if (
        status &&
        discountDetail &&
        !discountDetail.isApplicableToAll
      ) {
        const specificProductsId = discountDetail.specificProducts.map(
          prod => prod.prodId
        );
        dispatch(
          updateDiscountValueToCart(
            specificProductsId,
            discountDetail.discountValue
          )
        );
        dispatch(getCartDetails(userInfo._id));
      }
    }
  }, [discountDetail, userInfo]);

  const itemsCount = carts?.reduce((acc, item) => acc + item.qty, 0);
  const itemsPrice = carts?.reduce(
    (acc, item) => acc + item.qty * item.response.price,
    0
  );

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
  }, [cartRemoved, updateSuccess, userInfo]);

  const checkoutHandler = () => {
    if (itemsCount) history.push(`/checkout/${userInfo._id}`);
  };

  return (
    <section>
      {wholeCartLoading ? (
        <Lottie options={defaultOptions1} height={400} width={400} />
      ) : (
        <>
          {loading || cartListLoading || cartUpdateLoading ? (
            <Lottie options={defaultOptions3} height={400} width={400} />
          ) : (
            <div className="container">
              <div className="cart-template page-content">
                {itemsCount === 0 ? (
                  <div className="empty-cart">
                    <p>YOUR CART IS EMPTY</p>
                    <Link to="/">
                      <button className="button button-hollow">
                        Continue Shopping
                      </button>
                    </Link>
                  </div>
                ) : (
                  <>
                    <h2>Cart</h2>
                    <div className="cart-count-price">
                      <p className="no-margin">
                        <span className="cart-total-quantity">
                          TOTAL: {itemsCount} items{' '}
                        </span>
                        <strong className="cart-total-price">
                          (
                          <span>
                            <span id="revy-cart-subtotal-price">
                              ${totalPrice}
                            </span>
                          </span>
                          )
                        </strong>
                      </p>
                    </div>
                    <div className="main-cart-wrapper">
                      <div className="cart__items cart__block">
                        <div className="line-items">
                          {cartProd?.map(item => {
                            return (
                              <CartProducts
                                key={Math.random()}
                                productId={item}
                                overallUpdateCart={overallUpdateCart}
                              />
                            );
                          })}
                        </div>
                      </div>
                      <div className="cart__details cart_block">
                        <div className="cart__details-wrap">
                          <h5>ORDER SUMMARY</h5>
                          <p className="no-margin evenly-align">
                            <span className="cart-total-quantity">
                              {itemsCount} items
                            </span>
                            <span className="cart-total-price">
                              <span>$ {itemsPrice.toFixed(2)}</span>
                            </span>
                          </p>
                          {discountAmount ? (
                            <div className="cart-subtotal evenly-align cart__total">
                              <span className="cart-subtotal__title">
                                Discount
                              </span>
                              <strong>
                                <span className="cart-subtotal__price">
                                  $ {discountAmount.toFixed(2)}
                                </span>
                              </strong>
                            </div>
                          ) : (
                            ''
                          )}
                          <div className="cart-subtotal evenly-align cart__total">
                            <span className="cart-subtotal__title">
                              Subtotal
                            </span>
                            <strong>
                              <span className="cart-subtotal__price">
                                ${subTotal}
                              </span>
                            </strong>
                          </div>
                          <div className="cart__total evenly-align">
                            <span className="cart__total-text">Total:</span>
                            <strong className="cart__total-price">
                              <span>${totalPrice}</span>
                              <span> USD</span>
                            </strong>
                          </div>
                          <button
                            className="button update_btn width-100"
                            type="submit"
                            onClick={() => lastUpdate()}>
                            Update Quantity
                          </button>
                          <button
                            onClick={checkoutHandler}
                            className="button checkout_btn button--hollow">
                            Checkout
                          </button>

                          <ApplyDiscount history={history} />
                          <div className="text-center mt-20">
                            <Link
                              className="link-text-line"
                              to="/home"
                              title="Continue shopping">
                              Continue shopping
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};
export default CartPage;

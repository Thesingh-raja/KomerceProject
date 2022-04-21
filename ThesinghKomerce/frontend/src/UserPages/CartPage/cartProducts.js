import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {removeFromCart, updateCart} from '../../actions/cartActions';
import {Link} from 'react-router-dom';

export const CartProducts = ({productId, overallUpdateCart}) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(productId.qty);
  const [symbolsArr] = useState(['e', 'E', '+', '-', '.']);
  const updateCartQuantityHandler = (id, qnty) => {
    if (qty === null || qty === '' || qty === undefined || qty === '0') {
      dispatch(removeFromCart(id));
    } else {
      if (productId?.response?.inventory >= qnty) {
        if (qty !== qnty) {
          dispatch(updateCart(id, qnty));

          toast.clearWaitingQueue();
          toast.success('Product Quantity Updated', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 700,
          });
        }
      }
    }
  };
  const removeFromCartHandler = id => dispatch(removeFromCart(id));

  return (
    <div className="line-item">
      <div className="line-item__left">
        <div className="line-item__image-wrapper">
          <img
            className="line-item__image"
            src={productId?.response?.image}
            alt={productId?.reponse?.name}
          />
        </div>
      </div>
      <div className="line-item__right">
        <div className="line-item__details">
          <h2 className="line-item-title">
            <Link
              to={`product/${productId?.response?._id}`}
              className="cart__product-title">
              {productId?.response?.name}
            </Link>
          </h2>
          <button
            onClick={() => {
              removeFromCartHandler(productId?.cartData?._id);
            }}
            title="Remove item"
            className="line-item__remove">
            <svg
              aria-hidden="true"
              viewBox="0 0 448 512"
              className="svg-inline--fa fa-trash-alt fa-w-14 fa-3x">
              <path
                fill="currentColor"
                d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
                className=""></path>
            </svg>
          </button>
        </div>

        <div className="line-item__price">
          <span>
            <strong>Price:</strong>
          </span>
          ${productId?.response?.price}
        </div>

        <div className="line-item__total-amount-price">
          <span>
            <strong>Total Price:</strong>
          </span>
          ${productId?.response?.price * qty}
        </div>

        <div className="line-item__quantity">
          <span className="line-item__quantity-text">Quantity:</span>
          <input
            type="number"
            name="updates"
            size="4"
            min="1"
            max={productId?.response?.inventory}
            value={qty}
            onKeyDown={e => symbolsArr.includes(e.key) && e.preventDefault()}
            onChange={e => {
              const re = e.target.value.replace(/[^0-9]/gi, '');
              if (re === '0') {
                setQty(1);
                toast.warn('Product Quantity Cannot be Zero');
              } else if (productId?.response?.inventory < re) {
                toast.clearWaitingQueue();
                toast.warn(
                  `Only ${productId?.response?.inventory} Products Left`,
                  {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 500,
                  }
                );
                setQty(qty);
              } else {
                setQty(re);
                overallUpdateCart(productId?.cartData?._id, re);
              }
            }}
          />
          <button
            onClick={() =>
              updateCartQuantityHandler(productId?.cartData?._id, Number(qty))
            }
            className="button update_btn"
            type="submit">
            Update Quantity
          </button>
        </div>
      </div>
    </div>
  );
};

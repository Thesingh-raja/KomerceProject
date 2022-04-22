import axios from 'axios';
import {toast} from 'react-toastify';
import {
  CART_ADD_ITEM,
  CART_REMOVE_REQUEST,
  CART_REMOVE_SUCCESS,
  CART_LIST_REQUEST,
  CART_LIST_SUCCESS,
  CART_LIST_FAIL,
  CART_DETAILS_REQUEST,
  CART_DETAILS_SUCCESS,
  CART_DETAILS_FAIL,
  CART_UPDATE_REQUEST,
  CART_UPDATE_SUCCESS,
  CART_UPDATE_FAIL,
  DISCOUNT_REMOVE_REQUEST,
  DISCOUNT_REMOVE_SUCCESS,
  DISCOUNT_REMOVE_FAIL,
  OVERALL_UPDATE_SUCCESS,
  OVERALL_UPDATE_REQUEST,
  CHECK_CART_REQUEST,
  CHECK_CART_SUCCESS,
} from '../constants/cartConstants';
import {logout} from './userActions';
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const {data} = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      qty,
    },
  });

  const {
    userLogin: {userInfo},
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  const cart = getState().cart.cartItems[0];
  await axios.post(`/api/cart/add`, {userInfo, cart}, config);
  dispatch(getCartDetails(userInfo._id));
};

export const removeFromCart = id => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_REQUEST,
    cartRemoveLoading: true,
    payload: id,
  });
  await axios.delete(`/api/cart/${id}`);
  dispatch({type: CART_REMOVE_SUCCESS, cartRemoved: false});
};

export const checkCartDispatch = carts => async (dispatch, getState) => {
  dispatch({type: CHECK_CART_REQUEST, checkloading: true});
  const {data} = await axios.post(`/api/cart/checkCart`, carts);
  const datas = data.filter(el => el !== null);

  dispatch({type: CHECK_CART_SUCCESS, checkloading: false, payload: datas});
};

export const getCartDetails = id => async dispatch => {
  try {
    dispatch({type: CART_LIST_REQUEST, payload: []});

    const config = {headers: {'Access-Control-Allow-Origin': '*'}};

    const {data} = await axios.get(`/api/cart/${id}`, config);

    dispatch({
      type: CART_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CART_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const clearCart = id => async dispatch => {
  const config = {headers: {'Access-Control-Allow-Origin': '*'}};
  await axios.delete(`/api/cart/delete-cart/${id}`, config);
};

export const updateCart = (cart, qty) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_UPDATE_REQUEST,
    });

    const {
      userLogin: {userInfo},
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const {data} = await axios.put(`/api/cart/${cart}/${qty}`, config);

    dispatch({
      type: CART_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch(getCartDetails(userInfo._id));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      //   dispatch(logout());
    }
    dispatch({
      type: CART_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const updateDiscountToCart =
  discountId => async (dispatch, getState) => {
    try {
      //     dispatch({
      //       type: CART_UPDATE_REQUEST,
      //     })

      const {
        userLogin: {userInfo},
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(
        `/api/cart/add-discount/${userInfo._id}/${discountId}`,
        config
      );

      // dispatch({
      //   type: CART_UPDATE_SUCCESS,
      //   payload: data,
      // })
      // dispatch({ type: CART_DETAILS_SUCCESS, payload: data })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Not authorized, token failed') {
        // dispatch(logout());
      }
      // dispatch({
      //   type: CART_UPDATE_FAIL,
      //   payload: message,
      // });
    }
  };
export const removeDiscountFromCart =
  discountId => async (dispatch, getState) => {
    try {
      dispatch({
        type: DISCOUNT_REMOVE_REQUEST,
      });

      const {
        userLogin: {userInfo},
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.put(
        `/api/cart/add-discount/${userInfo._id}/${discountId}`,
        config
      );

      dispatch({
        type: DISCOUNT_REMOVE_SUCCESS,
        // payload: data,
      });
      toast.info('Coupon Removed!', {position: toast.POSITION.TOP_CENTER});

      dispatch(getCartDetails(userInfo._id));
      // dispatch({ type: CART_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Not authorized, token failed') {
        // dispatch(logout());
      }
      dispatch({
        type: DISCOUNT_REMOVE_FAIL,
        payload: message,
      });
    }
  };

export const listCartDetails = id => async dispatch => {
  try {
    dispatch({type: CART_DETAILS_REQUEST});
    //dispatch({ type: CART_DETAILS_SUCCESS, payload: null})

    const {data} = await axios.get(`/api/cart/${id}`);
    dispatch({
      type: CART_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CART_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateDiscountValueToCart =
  (idArr, value) => async (dispatch, getState) => {
    const {
      userLogin: {userInfo},
    } = getState();
    const body = {userId: userInfo._id, Arr: idArr};
    const {data} = await axios.post(
      `/api/cart/update-discount-value/${value}`,
      body
    );
  };

export const overAllUpdateQty = arr => async (dispatch, getState) => {
  const {
    userLogin: {userInfo},
  } = getState();

  dispatch({type: OVERALL_UPDATE_REQUEST});
  await axios.post('/api/cart/overall-update', arr);
  dispatch({type: OVERALL_UPDATE_SUCCESS});
};

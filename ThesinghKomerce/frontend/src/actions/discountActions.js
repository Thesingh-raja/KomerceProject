import axios from 'axios';
import {toast} from 'react-toastify';
import {
  DISCOUNT_LIST_REQUEST,
  DISCOUNT_LIST_SUCCESS,
  DISCOUNT_LIST_FAIL,
  DISCOUNT_DETAILS_REQUEST,
  DISCOUNT_DETAILS_SUCCESS,
  DISCOUNT_DETAILS_FAIL,
  DISCOUNT_CREATE_REQUEST,
  DISCOUNT_CREATE_SUCCESS,
  DISCOUNT_CREATE_FAIL,
  DISCOUNT_UPDATE_REQUEST,
  DISCOUNT_UPDATE_SUCCESS,
  DISCOUNT_UPDATE_FAIL,
} from '../constants/discountConstants';
import {logout} from './userActions';
import {getCartDetails} from './cartActions';

export const listDiscounts = () => async dispatch => {
  try {
    dispatch({type: DISCOUNT_LIST_REQUEST});

    const {data} = await axios.get(`/api/discounts`);
    dispatch({
      type: DISCOUNT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DISCOUNT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listDiscountDetails = id => async dispatch => {
  try {
    dispatch({type: DISCOUNT_DETAILS_REQUEST});

    const {data} = await axios.get(`/api/discounts/${id}`);

    dispatch({
      type: DISCOUNT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DISCOUNT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createDiscount = body => async (dispatch, getState) => {
  try {
    dispatch({
      type: DISCOUNT_CREATE_REQUEST,
    });

    const {
      userLogin: {userInfo},
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const {data} = await axios.post(`/api/discounts`, {...body}, config);

    dispatch({
      type: DISCOUNT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message.includes('E11000 duplicate key'))
      toast.error(
        'This Discount Code Already Exists, Please create a unique Coupon',
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
    if (message === 'Not authorized, token failed') {
      // dispatch(logout());
    }
    dispatch({
      type: DISCOUNT_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateDiscount = discount => async (dispatch, getState) => {
  try {
    dispatch({
      type: DISCOUNT_UPDATE_REQUEST,
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

    const {data} = await axios.put(
      `/api/discounts/${discount._id}`,
      discount,
      config
    );

    dispatch({
      type: DISCOUNT_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({type: DISCOUNT_DETAILS_SUCCESS, payload: data});
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message.includes('E11000 duplicate key'))
      toast.error(
        'This Discount Code Already Exists, Please provide a unique value',
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
    if (message === 'Not authorized, token failed') {
      // dispatch(logout());
    }
    dispatch({
      type: DISCOUNT_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const getDiscountDetailsByCode =
  discountCode => async (dispatch, getState) => {
    try {
      dispatch({type: DISCOUNT_DETAILS_REQUEST});

      const {data} = await axios.get(`/api/discounts/discount/${discountCode}`);

      dispatch({
        type: DISCOUNT_DETAILS_SUCCESS,
        payload: data,
      });

      const {
        userLogin: {userInfo},
      } = getState();
      dispatch(getCartDetails(userInfo._id));
      if (data && discountCode && data.status) {
        toast.clearWaitingQueue();
        toast.success('Coupon Applied Successfully', {
          position: toast.POSITION.TOP_CENTER,
        });
      } else if (data && discountCode && !data.status) {
        toast.clearWaitingQueue();
        toast.warn(data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      if (discountCode)
        toast.error('Invalid Coupon', {
          position: toast.POSITION.TOP_CENTER,
        });
      dispatch({
        type: DISCOUNT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getDiscountDetailById =
  discountId => async (dispatch, getState) => {
    try {
      dispatch({type: DISCOUNT_DETAILS_REQUEST});

      if (discountId) {
        const {data} = await axios.post(
          `/api/discounts/discountById/${discountId}`
        );
        dispatch({
          type: DISCOUNT_DETAILS_SUCCESS,
          payload: data,
        });
      } else {
        throw new Error('Manually generated error');
      }
    } catch (error) {
      dispatch({
        type: DISCOUNT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteDiscount = Id => async (dispatch, getState) => {
  await axios.delete(`/api/discounts/delete-discount/${Id}`);
};

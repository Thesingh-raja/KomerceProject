import axios from 'axios';
import {
  LINE_LIST_FAIL,
  LINE_LIST_SUCCESS,
  LINE_LIST_REQUEST,
  SESSION_CREATE_REQUEST,
  SESSION_CREATE_SUCCESS,
  SESSION_CREATE_FAIL,
  SESSION_DETAILS_REQUEST,
  SESSION_DETAILS_SUCCESS,
  SESSION_DETAILS_FAIL,
} from '../constants/stripeConstants';
import {logout} from './userActions';

export const createStripeSession =
  (orderId, body) => async (dispatch, getState) => {
    try {
      dispatch({type: SESSION_CREATE_REQUEST});

      const config = {headers: {'Access-Control-Allow-Origin': '*'}};
      //get checkout sessions from API
      const {data} = await axios.post(
        `/api/checkouts/checkout-session/${orderId}`,
        body,
        config
      );

      dispatch({type: SESSION_CREATE_SUCCESS, payload: data});
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Not authorized, token failed') {
        // dispatch(logout());
      }
      dispatch({
        type: SESSION_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const getStripeSessionDetails = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: SESSION_DETAILS_REQUEST,
    });

    const {
      userLogin: {userInfo},
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const {data} = await axios.get(`/api/checkouts/session/${id}`, config);

    dispatch({
      type: SESSION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      // dispatch(logout());
    }
    dispatch({
      type: SESSION_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const getStripeLineItems = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: LINE_LIST_REQUEST,
    });

    const {
      userLogin: {userInfo},
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const {data} = await axios.get(`/api/checkouts/line-items/${id}`, config);

    dispatch({
      type: LINE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      // dispatch(logout());
    }
    dispatch({
      type: LINE_LIST_FAIL,
      payload: message,
    });
  }
};

export const increaseReducedQuantity = id => async (dispatch, getState) => {
  const {data} = await axios.get(`/api/checkouts/reupdate-inventory/${id}`);
};

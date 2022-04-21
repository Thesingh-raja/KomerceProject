import axios from 'axios';

import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_RESET,
  USER_LIST_RESET,
  SAVE_ADDRESS_REQUEST,
  SAVE_ADDRESS_SUCCESS,
  SAVE_ADDRESS_FAIL,
} from '../constants/userConstants';
import {ORDER_LIST_MY_RESET} from '../constants/orderConstants';

export const login = (email, password) => async dispatch => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const {data} = await axios.post(
      '/api/users/login',
      {email, password},
      config
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const session = () => async dispatch => {
  const {data: datas} = await axios.get('/user/sessions');

  if (datas.user) {
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: datas.user,
    });
  } else {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: '',
    });
  }
};

export const logout = (req, res, next) => async dispatch => {
  await axios.get('/user/logout');

  dispatch({type: USER_LOGOUT});
  dispatch({type: USER_DETAILS_RESET});
  dispatch({type: ORDER_LIST_MY_RESET});
  dispatch({type: USER_LIST_RESET});
  document.location = '/';
};

export const register = (email, password) => async dispatch => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const {data} = await axios.post('/api/users', {email, password}, config);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: {userInfo},
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const {data} = await axios.get(`/api/users/${id}`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
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
      type: USER_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const userAddressInfo = addressInfo => async (dispatch, getState) => {
  try {
    dispatch({
      type: SAVE_ADDRESS_REQUEST,
    });

    const {
      userLogin: {userInfo},
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const {data} = await axios.post(
      `/api/users/address/${userInfo._id}`,
      addressInfo,
      config
    );
    dispatch({
      type: SAVE_ADDRESS_SUCCESS,
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
      type: SAVE_ADDRESS_FAIL,
      payload: message,
    });
  }
};
export const updateAddressInfo = addressInfo => async (dispatch, getState) => {
  const {
    userLogin: {userInfo},
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  await axios.post(
    `/api/users/address-update/${userInfo._id}`,
    addressInfo,
    config
  );
};

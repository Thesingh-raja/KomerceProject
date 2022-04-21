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

export const lineItemsReducer = (state = { lineItems: [] }, action) => {
  switch (action.type) {
    case LINE_LIST_REQUEST:
      return {
        loading: true,
      };
    case LINE_LIST_SUCCESS:
      return {
        loading: false,
        lineItems: action.payload,
      };
    case LINE_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const sessionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SESSION_CREATE_REQUEST:
      return {
        sessionCreateLoading: true,
      };
    case SESSION_CREATE_SUCCESS:
      return {
        sessionCreateLoading: false,
        sessionCreated: true,
        session: action.payload,
      };
    case SESSION_CREATE_FAIL:
      return {
        sessionCreateLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const sessionDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case SESSION_DETAILS_REQUEST:
      return {
        sessionDETAILSLoading: true,
      };
    case SESSION_DETAILS_SUCCESS:
      return {
        sessionDETAILSLoading: false,
        sessionDETAILSd: true,
        session: action.payload,
      };
    case SESSION_DETAILS_FAIL:
      return {
        sessionDETAILSLoading: false,
        error: action.payload,
      };
    //
    default:
      return state;
  }
};

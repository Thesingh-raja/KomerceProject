import {
  CART_ADD_ITEM,
  CART_REMOVE_REQUEST,
  CART_REMOVE_SUCCESS,
  CART_CLEAR_ITEMS,
  CART_DETAILS_REQUEST,
  CART_DETAILS_SUCCESS,
  CART_DETAILS_FAIL,
  CART_LIST_REQUEST,
  CART_LIST_SUCCESS,
  CART_LIST_FAIL,
  CART_UPDATE_REQUEST,
  CART_UPDATE_SUCCESS,
  CART_UPDATE_FAIL,
  OVERALL_UPDATE_REQUEST,
  OVERALL_UPDATE_SUCCESS,
} from '../constants/cartConstants';

export const cartReducer = (state = {cartlist: []}, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartlist?.carts.find(
        x => x.cartData.product === item.product
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [item],
        };
      }

    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };

    case CART_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CART_DETAILS_SUCCESS: {
      return {
        loading: false,
        cart: action.payload,
      };
    }
    case CART_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const cartListReducer = (state = {carts: []}, action) => {
  switch (action.type) {
    case CART_LIST_REQUEST:
      return {cartListLoading: true, carts: []};
    case CART_LIST_SUCCESS:
      return {
        cartListLoading: false,
        carts: action.payload,
      };
    case CART_LIST_FAIL:
      return {cartListLoading: false, error: action.payload};
    default:
      return state;
  }
};

export const cartItemRemoveReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_REMOVE_REQUEST:
      return {cartRemoveLoading: true};
    case CART_REMOVE_SUCCESS:
      return {
        cartRemoved: true,
        cartRemoveLoading: false,
      };
    default:
      return state;
  }
};

export const cartUpdateReducer = (state = {cartUpdate: []}, action) => {
  switch (action.type) {
    case CART_UPDATE_REQUEST:
      return {cartUpdateLoading: true};
    case CART_UPDATE_SUCCESS:
      return {cartUpdateLoading: false, cartUpdate: action.payload};
    case CART_UPDATE_FAIL:
      return {cartUpdateLoading: false};
    default:
      return state;
  }
};
export const overAllUpdate = (state = {}, action) => {
  switch (action.type) {
    case OVERALL_UPDATE_REQUEST:
      return {updateSuccess: false};
    case OVERALL_UPDATE_SUCCESS:
      return {updateSuccess: true};
    default:
      return state;
  }
};

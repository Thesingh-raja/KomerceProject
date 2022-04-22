import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {
  productListReducer,
  productDetailsReducer,
  productCreateReducer,
  productUpdateReducer,
} from './reducers/productReducers';
import {
  cartReducer,
  cartListReducer,
  cartUpdateReducer,
  cartItemRemoveReducer,
  overAllUpdate,
  checkCart,
} from './reducers/cartReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userAddressReducer,
} from './reducers/userReducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderDetailReducer,
  orderListMyReducer,
  orderListReducer,
} from './reducers/orderReducers';
import {
  sessionCreateReducer,
  sessionDetailsReducer,
  lineItemsReducer,
} from './reducers/stripeReducers';

import {
  discountListReducer,
  discountDetailsReducer,
  discountCreateReducer,
  discountUpdateReducer,
} from './reducers/discountReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,

  checkCart: checkCart,
  cart: cartReducer,
  cartlist: cartListReducer,
  cartUpdate: cartUpdateReducer,
  cartItemRemove: cartItemRemoveReducer,
  overAllUpdate,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userAddress: userAddressReducer,

  orderCreate: orderCreateReducer,
  orderListUser: orderDetailsReducer,
  orderDetailRecent: orderDetailReducer,

  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  lineItems: lineItemsReducer,
  sessionCreate: sessionCreateReducer,
  sessionDetails: sessionDetailsReducer,
  discountList: discountListReducer,
  discountDetails: discountDetailsReducer,
  discountCreate: discountCreateReducer,
  discountUpdate: discountUpdateReducer,
});

export const initialState = {
  cart: {},
  userLogin: {},
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

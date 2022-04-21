import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import App from './App';

export const stripePromise = loadStripe(
  'pk_test_51KiyfpSIuzXgMLx9tjckl2bI3zrCS8XUhmKSu9PZpRTyAT9Hi0e9Iqamq24q90bXfN7XLA7n2N24ewKGzrCuex4200PsrILrAX'
);

ReactDOM.render(
  <Provider store={store}>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </Provider>,
  document.getElementById('root')
);

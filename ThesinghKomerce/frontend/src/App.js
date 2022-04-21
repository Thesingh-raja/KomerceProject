import React from 'react';
import {useSelector} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './UserPages/HomePage/Index';
import ProductPage from './UserPages/ProductPage/Index';
import CartPage from './UserPages/CartPage/Index';
import LoginPage from './UserPages/LoginPage';
import RegisterPage from './UserPages/RegisterPage';
import CheckoutPage from './UserPages/CheckoutPage/Index';
import OrderSuccessPage from './UserPages/OrderSuccessPage';
import OrderDetailsPage from './UserPages/OrderDetailsPage/Index';
import OrderListPage from './UserPages/OrderListPage';
import NotFound from './UserPages/NotFound';
import './css/style.css';
import AdminCollectionPage from './adminPages/adminCollectionPage';
import AdminOrdersPage from './adminPages/adminOrdersPage';
import AdminDiscountPage from './adminPages/adminDiscountPage/adminDiscountPage';
import AdminAddProductPage from './adminPages/adminAddProductPage/Index';
import AdminCreateDiscountPage from './adminPages/adminCreateDiscount/Index';
import AdminEditDiscountPage from './adminPages/adminEditDiscountPage/Index';
import AdminEditProductPage from './adminPages/adminEditProductPage/Index';
import AdminOrderDetailsPage from './adminPages/adminOrderDetails/Index';

const App = () => {
  const {userInfo} = useSelector(state => state.userLogin);
  return (
    <Router>
      <Header />
      <main className="main-vh">
        <Switch>
          <Route path="/" component={LoginPage} exact />
          <Route path="/register" component={RegisterPage} />

          <Route path="/home" component={HomePage} />
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/checkout/:id" component={CheckoutPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/success/:id" component={OrderSuccessPage} />
          <Route path="/order-details/:id" component={OrderDetailsPage} />
          <Route path="/order-list" component={OrderListPage} />

          <Route path="/admin/productlist" component={AdminCollectionPage} />
          <Route
            path="/admin/product/:id/edit"
            component={AdminEditProductPage}
          />
          <Route path="/admin/product/create" component={AdminAddProductPage} />
          <Route path="/admin/discountlist" component={AdminDiscountPage} />
          <Route
            path="/admin/discount/:id/edit"
            component={AdminEditDiscountPage}
          />
          <Route
            path="/admin/discount/create"
            component={AdminCreateDiscountPage}
          />
          <Route path="/admin/orderlist" component={AdminOrdersPage} />
          <Route path="/admin/order/:id" component={AdminOrderDetailsPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
};

export default App;

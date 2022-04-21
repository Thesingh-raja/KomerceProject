import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Product from './Product';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Meta from '../../components/Meta';
import {listProducts} from '../../actions/productActions';
import {getCartDetails} from '../../actions/cartActions';
import Lottie from 'react-lottie';
import {defaultOptions4} from '../../lotties/defaultOption';

const HomePage = ({history}) => {
  const dispatch = useDispatch();
  const {loading, error, products} = useSelector(state => state.productList);
  const {userInfo} = useSelector(state => state.userLogin);
  const [splash, setSplash] = useState(false);
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) history.push('/');
  }, [userInfo, history]);
  useEffect(() => {
    if (userInfo) {
      setSplash(true);
      dispatch(listProducts());
      dispatch(getCartDetails(userInfo._id));
      setTimeout(() => {
        setSplash(false);
      }, [800]);
    } else history.push('/');
  }, [userInfo, history]);

  return (
    <div className="container">
      <Meta />
      {splash ? (
        <Lottie options={defaultOptions4} height={400} width={400} />
      ) : (
        <div className="product-collection page-content">
          <h1>Collections</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <div className="products-grid row">
              {products.map(product =>
                product.status ? (
                  <div className="grid-item" key={product._id}>
                    <Product product={product} />
                  </div>
                ) : null
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;

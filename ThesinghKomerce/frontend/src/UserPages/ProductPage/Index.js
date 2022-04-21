import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../../components/Message';
import {listProductDetails} from '../../actions/productActions';
import {addToCart, getCartDetails, updateCart} from '../../actions/cartActions';
import {Tick} from 'react-crude-animated-tick';
import Lottie from 'react-lottie';
import {defaultOptions3, defaultOptions4} from '../../lotties/defaultOption';
import {toast} from 'react-toastify';
import {ProductContainer} from './ProductContainer';
const ProductPage = ({history, match}) => {
  const [splash, setSplash] = useState(false);
  useEffect(() => {
    setSplash(true);
    setTimeout(() => {
      setSplash(false);
    }, 2000);
  }, [history]);

  const dispatch = useDispatch();
  const {userInfo} = useSelector(state => state.userLogin);
  const {loading, error, product} = useSelector(state => state.productDetails);
  const {cartListLoading, carts} = useSelector(state => state.cartlist);
  const [qty, setQty] = useState(1);
  const {cartUpdateLoading} = useSelector(state => state.cartUpdate);
  const [adding, setAdding] = useState(false);
  const [alert, setAlert] = useState(false);
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) history.push('/');
  }, [userInfo, history]);
  useEffect(() => {
    if (userInfo) dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, cartListLoading, userInfo]);
  useEffect(() => {
    if (userInfo) dispatch(getCartDetails(userInfo._id));
  }, [match, userInfo]);
  useEffect(() => {
    if (userInfo && qty > product.inventory - itemExist?.qty) setAlert(true);
  }, [history, qty, userInfo]);
  // }, [userInfo]);

  let itemExist = [];
  itemExist = carts.find(el => el.cartData.product === match.params.id);

  const addToCartHandler = () => {
    if (qty > 0) {
      if (itemExist && itemExist.length !== 0) {
        if (Number(itemExist.qty) + Number(qty) <= product.inventory) {
          setAdding(true);
          toast.success('Product added to Cart', {
            autoClose: 500,
          });
          dispatch(
            updateCart(
              itemExist.cartData._id,
              Number(itemExist.qty) + Number(qty)
            )
          );
          setQty(1);
        } else {
          toast.info(`Only ${product.inventory} Quantity Left`);
          setAlert(true);
        }
      } else {
        setAdding(true);
        toast.success('Product added to Cart', {});
        dispatch(addToCart(match.params.id, qty));
        setQty(1);
      }
      setTimeout(() => {
        setAdding(false);
      }, 1400);
    } else {
      toast.clearWaitingQueue();
      toast.warn('Please Enter a Valid Quantity', {
        autoClose: 800,
      });
    }
  };

  const availableProducts = itemExist
    ? Number(product.inventory) - Number(itemExist?.qty)
    : product.inventory;

  return (
    <section>
      {splash ? (
        <Lottie options={defaultOptions4} height={400} width={400} />
      ) : (
        <>
          {product && product.status ? (
            <>
              {adding ? (
                <div className="tick">
                  <Tick size={200} />
                </div>
              ) : (
                <>
                  {loading || cartListLoading || cartUpdateLoading ? (
                    <Lottie
                      options={defaultOptions3}
                      height={400}
                      width={400}
                    />
                  ) : error ? (
                    <Message variant="danger">{error}</Message>
                  ) : (
                    <ProductContainer
                      product={product}
                      qty={qty}
                      setAlert={setAlert}
                      setQty={setQty}
                      availableProducts={availableProducts}
                      addToCartHandler={addToCartHandler}
                      adding={adding}
                      alert={alert}
                    />
                  )}
                </>
              )}
            </>
          ) : (
            <div className="container align-notFound">Product Not Found !</div>
          )}{' '}
        </>
      )}
    </section>
  );
};

export default ProductPage;

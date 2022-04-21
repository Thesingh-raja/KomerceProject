import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {createDiscount} from '../../actions/discountActions';
import {listProducts} from '../../actions/productActions';
import {Nav} from './Nav';
import {formatDate} from './helper';
import {Modal} from './modal';
import {OrderDetails} from './orderDetails';
import {toast} from 'react-toastify';
import {listOrders} from '../../actions/orderActions';
import {AppliesTo} from './AppliesTo';
import {Details} from './Details';
const AdminCreateDiscountPage = ({history}) => {
  const dispatch = useDispatch();

  const [discountCode, setDiscountCode] = useState();
  const [discountValue, setDiscountValue] = useState();
  const [status, setStatus] = useState(true);
  const [isApplicableToAll, setIsApplicableToAll] = useState(true);
  const [specificProducts, setSpecificProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [viewModal, setViewModal] = useState(false);
  const {userInfo} = useSelector(state => state.userLogin);
  useEffect(() => {
    if (userInfo && !userInfo.isAdmin) history.push('/');
  }, [userInfo, history]);

  useEffect(() => {
    if (userInfo) dispatch(listProducts());
  }, [history, userInfo]);
  const submitHandler = e => {
    e.preventDefault();
    if (Number(discountValue) < 100) {
      if (new Date(startDate).getTime() < new Date(endDate).getTime()) {
        if (
          isApplicableToAll ||
          (!isApplicableToAll && specificProducts.length)
        ) {
          dispatch(
            createDiscount({
              discountCode,
              discountValue,
              status,
              isApplicableToAll,
              specificProducts,
              startDate,
              endDate,
            })
          );
          dispatch(listOrders());
          history.push('/admin/discountlist');
        } else {
          toast.warn('Please Select a Specific Product');
        }
      } else toast.warn('End Date Should be Greater than Start Date');
    } else {
      toast.warn('Enter Discount Value Less than 100');
    }
  };

  const startDateValue = formatDate(startDate);
  const endDateValue = formatDate(endDate);

  const showModal = () => {
    var specific = document.getElementById('specific');
    specific.checked === true ? setViewModal(true) : setViewModal(false);
  };

  const hideModal = () => {
    setNewProducts([]);
    !viewModal ? setViewModal(true) : setViewModal(false);
  };

  const selectBoxHandler = (id, name, image) => {
    const el = {prodId: id, prodName: name, prodImage: image};
    let tempArr = [...newProducts];
    const available = tempArr.find(({prodId}) => prodId === el.prodId);
    if (available) tempArr = tempArr.filter(x => x.prodId !== available.prodId);
    else tempArr.push(el);
    setNewProducts(tempArr);
  };
  const addProdHandler = () => {
    setSpecificProducts([...specificProducts, ...newProducts]);
    hideModal();
  };

  const removeHandler = id => {
    let tempArr = [...specificProducts];
    tempArr = tempArr.filter(x => x.prodId !== id);
    setSpecificProducts(tempArr);
  };

  const productFilter = x => {
    return specificProducts.filter(el => el.prodId === x).length ? false : true;
  };

  return (
    <>
      <section className="flex">
        <div className="container-fluid">
          <div className="admin-content">
            <Nav />
            <div className="admin-right page-content">
              <div className="products-list">
                <div className="actions flex items-center">
                  <h3>{discountCode}</h3>
                </div>
                <div className="view-orders">
                  <div className="main-cart-wrapper">
                    <form
                      onSubmit={submitHandler}
                      className="cart__items cart__block">
                      <div className="form-inline">
                        <Details
                          discountCode={discountCode}
                          setDiscountCode={setDiscountCode}
                          discountValue={discountValue}
                          setDiscountValue={setDiscountValue}
                          status={status}
                          setStatus={setStatus}
                        />
                        <AppliesTo
                          isApplicableToAll={isApplicableToAll}
                          setIsApplicableToAll={setIsApplicableToAll}
                          setSpecificProducts={setSpecificProducts}
                          showModal={showModal}
                          specificProducts={specificProducts}
                          removeHandler={removeHandler}
                          startDateValue={startDateValue}
                          setStartDate={setStartDate}
                          endDateValue={endDateValue}
                          setEndDate={setEndDate}
                        />
                      </div>
                      <div className="mt-20">
                        <button
                          type="submit"
                          className="button button--hollow ">
                          Save
                        </button>
                        <Link to="/admin/discountlist">
                          <button className="button update_btn">Discard</button>
                        </Link>
                      </div>
                    </form>
                    <div className="cart__details cart__block add-margin">
                      <OrderDetails
                        discountValue={discountValue}
                        startDate={startDate}
                        status={status}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {viewModal ? (
        <Modal
          selectBoxHandler={selectBoxHandler}
          addProdHandler={addProdHandler}
          hideModal={hideModal}
          productFilter={productFilter}
        />
      ) : (
        ''
      )}
    </>
  );
};
export default AdminCreateDiscountPage;

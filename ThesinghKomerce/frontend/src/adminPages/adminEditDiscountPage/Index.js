import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
  listDiscountDetails,
  updateDiscount,
  deleteDiscount,
} from '../../actions/discountActions';
import {DISCOUNT_UPDATE_RESET} from '../../constants/discountConstants';
import {listProducts} from '../../actions/productActions';
import {toast} from 'react-toastify';

const AdminEditDiscountPage = ({match, history}) => {
  const discountId = match.params.id;
  const [discountCode, setDiscountCode] = useState();
  const [discountValue, setDiscountValue] = useState();
  const [status, setStatus] = useState(true);
  const [isApplicableToAll, setIsApplicableToAll] = useState(true);
  const [specificProducts, setSpecificProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [viewModal, setViewModal] = useState(false);

  const dispatch = useDispatch();
  const discountDetails = useSelector(state => state.discountDetails);
  const {discount} = discountDetails;
  const discountUpdate = useSelector(state => state.discountUpdate);
  const {userInfo} = useSelector(state => state.userLogin);
  const {success: successUpdate} = discountUpdate;
  const {products} = useSelector(state => state.productList);

  useEffect(() => {
    if (userInfo && !userInfo.isAdmin) history.push('/');
  }, [userInfo, history]);
  useEffect(() => {
    if (userInfo) dispatch(listProducts());
  }, [match, userInfo]);

  useEffect(() => {
    if (userInfo) {
      if (successUpdate) {
        dispatch({type: DISCOUNT_UPDATE_RESET});
        history.push('/admin/discountlist');
      } else {
        if (discount._id !== discountId) {
          dispatch(listDiscountDetails(discountId));
        } else {
          setDiscountCode(discount.discountCode);
          setDiscountValue(discount.discountValue);
          setStatus(discount.status);
          setIsApplicableToAll(discount.isApplicableToAll);
          setSpecificProducts(discount.specificProducts);
          setStartDate(discount.startDate);
          setEndDate(discount.endDate);
        }
      }
    }
  }, [dispatch, history, discountId, discount, successUpdate, userInfo]);
  // }, []);
  const submitHandler = e => {
    e.preventDefault();
    if (Number(discountValue) < 100) {
      if (new Date(startDate)?.getTime() < new Date(endDate)?.getTime()) {
        if (
          isApplicableToAll ||
          (!isApplicableToAll && specificProducts.length)
        ) {
          dispatch(
            updateDiscount({
              _id: discountId,
              discountCode,
              discountValue,
              status,
              specificProducts,
              isApplicableToAll,
              startDate,
              endDate,
            })
          );
        } else {
          toast.warn('Please Select a Specific Product');
        }
      } else toast.warn('End Date Should be Greater than Start Date', {});
    } else toast.warn('Enter Discount Value less than 100');
  };

  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  const startDateValue = formatDate(startDate);
  const endDateValue = formatDate(endDate);

  const showModal = () => {
    var specific = document.getElementById('specific');
    if (specific.checked === true) {
      setViewModal(true);
    } else {
      setViewModal(false);
    }
  };

  const hideModal = () => {
    setNewProducts([]);
    if (!viewModal) {
      setViewModal(true);
    } else {
      setViewModal(false);
    }
  };

  const selectBoxHandler = (id, name, image) => {
    const el = {prodId: id, prodName: name, prodImage: image};
    let tempArr = [...newProducts];
    const available = tempArr.find(({prodId}) => prodId === el.prodId);
    if (available) {
      //delete product from array
      tempArr = tempArr.filter(x => x.prodId !== available.prodId);
    } else {
      tempArr.push(el);
    }
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

  const deleteHandler = e => {
    e.preventDefault();

    toast.info('Discount deleted');
    dispatch(deleteDiscount(discountId));
    history.push('/admin/discountlist');
  };

  const productFilter = x => {
    if (specificProducts.filter(el => el.prodId === x).length) return false;
    else return true;
  };

  const [symbolsArr] = useState(['e', 'E', '+', '-', '.']);

  return (
    <>
      <section className="flex">
        <div className="container-fluid">
          <div className="admin-content">
            <div className="admin-left-nav mt-20">
              <ul>
                <li>
                  <Link to="/admin/productlist">Products</Link>
                </li>
                <li>
                  <Link to="/admin/orderlist">Orders</Link>
                </li>
                <li>
                  <Link className="active" to="/admin/discountlist">
                    Discount
                  </Link>
                </li>
              </ul>
            </div>
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
                        <div className="order__details-wrap">
                          <div className="flex">
                            <div className="w-50 pr-10">
                              <h4>Discount code</h4>
                              <input
                                type="text"
                                value={discountCode}
                                placeholder=""
                                className=""
                                onChange={e => setDiscountCode(e.target.value)}
                                required
                              />
                            </div>
                            <div className="w-50 pl-10">
                              <h4>Discount Value (in %)</h4>
                              <input
                                type="number"
                                value={discountValue}
                                placeholder=""
                                className=""
                                onKeyDown={e =>
                                  symbolsArr.includes(e.key) &&
                                  e.preventDefault()
                                }
                                onChange={e => setDiscountValue(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div className="mt-10">
                            <h4>Status</h4>
                            <div className="">
                              <label htmlFor="enable">
                                <input
                                  type="radio"
                                  className="input-text"
                                  value="true"
                                  checked={status}
                                  id="enable"
                                  name="status"
                                  onChange={e => setStatus(true)}
                                />
                                Enable
                              </label>
                            </div>
                            <div className="mt-10">
                              <label htmlFor="disable">
                                <input
                                  type="radio"
                                  className="input-text"
                                  value="false"
                                  checked={!status}
                                  id="disable"
                                  name="status"
                                  onChange={e => setStatus(false)}
                                />
                                Disable
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="order__details-wrap mt-20">
                          <div className="">
                            <h4>Applies to</h4>
                            <div className="">
                              <label htmlFor="all">
                                <input
                                  type="radio"
                                  checked={isApplicableToAll}
                                  className="input-text"
                                  id="all"
                                  name="products"
                                  onClick={e => {
                                    setIsApplicableToAll(true);
                                    setSpecificProducts([]);
                                  }}
                                />
                                All Products
                              </label>
                            </div>
                            <div className="mt-10">
                              <label htmlFor="specific">
                                <input
                                  type="radio"
                                  checked={!isApplicableToAll}
                                  className="input-text"
                                  id="specific"
                                  name="products"
                                  onClick={e => {
                                    setIsApplicableToAll(false);
                                    showModal();
                                  }}
                                />
                                Specific products
                              </label>
                            </div>
                          </div>

                          <div className="added-products mt-20">
                            {!isApplicableToAll ? (
                              <table className="table">
                                <tbody>
                                  {specificProducts?.map((el, index) => (
                                    <tr key={index}>
                                      <td>
                                        <span className="admin-list-img">
                                          <img
                                            src={el.prodImage}
                                            alt={el.prodName}
                                          />
                                        </span>
                                      </td>
                                      <td>
                                        <div className="">
                                          <Link
                                            to={`/admin/product/${el.prodId}/edit`}>
                                            <u>{el.prodName}</u>
                                          </Link>
                                        </div>
                                      </td>
                                      <td className="text-right">
                                        <u
                                          onClick={() =>
                                            removeHandler(el.prodId)
                                          }>
                                          Remove
                                        </u>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            ) : (
                              ''
                            )}
                          </div>

                          <div className="mt-20 discount-period">
                            <h4>Active Dates</h4>
                            <div className="flex">
                              <div className="w-50 pr-10">
                                <label htmlFor="">Start Date</label>
                                <input
                                  type="date"
                                  value={startDateValue}
                                  placeholder=""
                                  className=""
                                  onChange={e => setStartDate(e.target.value)}
                                  required
                                />
                              </div>
                              <div className="w-50 pl-10">
                                <label htmlFor="">End Date</label>
                                <input
                                  type="date"
                                  value={endDateValue}
                                  placeholder=""
                                  className=""
                                  onChange={e => setEndDate(e.target.value)}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-20">
                        <button
                          type="submit"
                          className="button button--hollow ">
                          Save
                        </button>
                        <button
                          className="button update_btn"
                          onClick={e => deleteHandler(e)}>
                          Delete
                        </button>
                      </div>
                    </form>
                    <div className="cart__details cart__block add-margin">
                      <div className="order__details-wrap">
                        <h3>Summary</h3>
                        <div className="border-t mt-10">
                          <div className="flex mt-20">
                            <p>
                              <strong>Cart Offer</strong>
                            </p>
                            {status ? (
                              <span className="color-green">Active</span>
                            ) : (
                              <span className="color-green">Inactive</span>
                            )}
                          </div>
                        </div>
                        <ul className="list-items">
                          <li>{discountValue}% off products</li>
                          <li>
                            Active from{' '}
                            {new Date(discount.startDate).toLocaleString(
                              'en-US',
                              {day: 'numeric', year: 'numeric', month: 'long'}
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {viewModal ? (
        <div id="show-modal">
          <div className="overlay"></div>
          <div className="admin-right page-content">
            <div className="products-list">
              <div className="actions flex items-center">
                <h3>Select products</h3>
              </div>
              <div className="added-products border-t">
                <div className="overflow-auto">
                  <table className="table mt-20">
                    <thead>
                      <tr>
                        <th>Select</th>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Inventory</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products
                        ?.filter(x => productFilter(x._id))
                        .map((product, index) => (
                          <tr key={index}>
                            <td>
                              <input
                                type="checkbox"
                                name="prod-item"
                                onChange={() =>
                                  selectBoxHandler(
                                    product._id,
                                    product.name,
                                    product.image
                                  )
                                }
                              />
                            </td>
                            <td>
                              <span className="admin-list-img">
                                <img src={product.image} alt={product.name} />
                              </span>
                            </td>
                            <td>
                              <div className="">
                                <Link to={`/admin/product/${product._id}/edit`}>
                                  <u>{product.name}</u>
                                </Link>
                              </div>
                              <span>
                                SKU: <span>{product.sku}</span>
                              </span>
                            </td>
                            <td>${product.price}</td>
                            <td>{product.inventory}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-20">
                <button
                  className="button button--hollow"
                  onClick={() => addProdHandler()}>
                  Apply
                </button>
                <button
                  className="button update_btn"
                  id="close-modal"
                  onClick={e => hideModal()}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};
export default AdminEditDiscountPage;

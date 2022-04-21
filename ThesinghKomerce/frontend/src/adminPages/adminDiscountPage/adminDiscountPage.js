import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {listDiscounts} from '../../actions/discountActions';
import {DiscountRows} from './DiscountRows';

const AdminDiscountPage = ({history}) => {
  const dispatch = useDispatch();

  const {discounts} = useSelector(state => state.discountList);

  const {userInfo} = useSelector(state => state.userLogin);
  useEffect(() => {
    if (userInfo && !userInfo.isAdmin) history.push('/');
  }, [userInfo, history]);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) dispatch(listDiscounts());
  }, [dispatch, history, userInfo]);

  return (
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
                <h3>Discounts</h3>
                <Link
                  to="/admin/discount/create"
                  className="button button--hollow justify-end inline-block">
                  Create Discount
                </Link>
              </div>

              <div className="added-products">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Discount Code</th>
                      <th>Times Used</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {discounts.map((discount, index) => (
                      <DiscountRows key={index} discount={discount} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AdminDiscountPage;

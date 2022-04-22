import React from 'react';
import {Link} from 'react-router-dom';
export const AppliesTo = ({
  isApplicableToAll,
  setIsApplicableToAll,
  setSpecificProducts,
  showModal,
  specificProducts,
  removeHandler,
  startDateValue,
  setStartDate,
  endDateValue,
  setEndDate,
}) => {
  return (
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
              {specificProducts?.map(el => (
                <tr>
                  <td>
                    <span className="admin-list-img">
                      <img src={el.prodImage} alt={el.prodName} />
                    </span>
                  </td>
                  <td>
                    <div className="">
                      <Link to={`/admin/product/${el.prodId}/edit`}>
                        <u>{el.prodName}</u>
                      </Link>
                    </div>
                  </td>
                  <td className="text-right">
                    <u
                      className="remove-btn"
                      onClick={() => removeHandler(el.prodId)}>
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
  );
};

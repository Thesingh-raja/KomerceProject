import React, {useState} from 'react';

export const Details = ({
  discountCode,
  setDiscountCode,
  discountValue,
  setDiscountValue,
  status,
  setStatus,
}) => {
  const [symbolsArr] = useState(['e', 'E', '+', '-', '.']);

  return (
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
            onKeyDown={e => symbolsArr.includes(e.key) && e.preventDefault()}
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
              onClick={e => setStatus(true)}
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
              onClick={e => setStatus(false)}
            />
            Disable
          </label>
        </div>
      </div>
    </div>
  );
};

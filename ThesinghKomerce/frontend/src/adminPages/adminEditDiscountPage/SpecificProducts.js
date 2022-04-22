import React from 'react';
import {Link} from 'react-router-dom';
export const SpecificProducts = props => {
  return (
    <div className="added-products mt-20">
      {!props.isApplicableToAll ? (
        <table className="table">
          <tbody>
            {props.specificProducts?.map((el, index) => (
              <tr key={index}>
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
                    onClick={() => props.removeHandler(el.prodId)}>
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
  );
};

import React from 'react';

const EmailTable = ({session}) => {
  const subTotal = session.totalPrice.toFixed(2);
  const orderItems = Object.values(session.orderItems[0]);
  const totalOriginalPrice = orderItems.reduce(
    (acc, item) => acc + item.qty * item.response.price,
    0
  );
  const totalDiscount = totalOriginalPrice - subTotal;
  return (
    <table
      className="row section"
      style={{width: '100%', borderSpacing: 0, borderCollapse: 'collapse'}}>
      <tbody>
        <tr>
          <td className="section__cell" style={{padding: '40px 0 0'}}>
            <center>
              <table
                className="container"
                style={{
                  width: 560,
                  textAlign: 'left',
                  borderSpacing: 0,
                  borderCollapse: 'collapse',
                  margin: '0 auto',
                  borderTop: '1px #e5e5e5 solid',
                }}>
                <tbody>
                  <tr>
                    <td style={{paddingTop: 35}}>
                      <h3
                        style={{
                          fontWeight: 'normal',
                          fontSize: 20,
                          margin: '0 0 25px',
                        }}>
                        Order summary
                      </h3>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table
                className="container"
                style={{
                  width: 560,
                  textAlign: 'left',
                  borderSpacing: 0,
                  borderCollapse: 'collapse',
                  margin: '0 auto',
                }}>
                <tbody>
                  <tr>
                    <td style={{}}>
                      <table
                        className="row"
                        style={{
                          width: '100%',
                          borderSpacing: 0,
                          borderCollapse: 'collapse',
                        }}>
                        <tbody>
                          {session.lineItems.map((item, index) => {

                            const originalPrice =
                              orderItems[index].response.price * item.quantity;

                            const discountedAmount =
                              originalPrice -
                              (item.amount / 100) * item.quantity;

                            return (
                              <tr key={index}>
                                <td style={{}}></td>
                                <td
                                  className="order-list__product-description-cell"
                                  style={{width: '100%'}}>
                                  <span
                                    className="order-list__item-title"
                                    style={{
                                      fontSize: 16,
                                      fontWeight: 600,
                                      lineHeight: '1.4',
                                      color: '#555',
                                    }}>
                                    {item.name}&nbsp;×&nbsp;{item.quantity}
                                  </span>
                                  <br />
                                  <span
                                    className="order-list__item-discount-allocation"
                                    style={{
                                      fontSize: 14,
                                      display: 'block',
                                      lineHeight: '1.4',
                                      color: '#555',
                                      margin: '5px 0 0',
                                    }}>
                                    {discountedAmount ? (
                                      <span
                                        style={{
                                          fontSize: 14,
                                          color: '#999',
                                        }}>
                                        DISCOUNT (-${discountedAmount})
                                      </span>
                                    ) : (
                                      ''
                                    )}
                                  </span>
                                </td>
                                {discountedAmount ? (
                                  <td
                                    className="order-list__price-cell"
                                    style={{whiteSpace: 'nowrap'}}>
                                    <del
                                      className="order-list__item-original-price"
                                      style={{
                                        fontSize: 14,
                                        display: 'block',
                                        textAlign: 'right',
                                        color: '#999',
                                      }}>
                                      ${originalPrice}
                                    </del>
                                    <p
                                      className="order-list__item-price"
                                      style={{
                                        color: '#555',
                                        lineHeight: '150%',
                                        fontSize: 16,
                                        fontWeight: 600,
                                        margin: '0 0 0 15px',
                                      }}
                                      align="right">
                                      $
                                      {(item.amount / 100).toFixed(2) *
                                        item.quantity}
                                    </p>
                                  </td>
                                ) : (
                                  <td
                                    className="order-list__price-cell"
                                    style={{whiteSpace: 'nowrap'}}>
                                    <p
                                      className="order-list__item-price"
                                      style={{
                                        color: '#555',
                                        lineHeight: '150%',
                                        fontSize: 16,
                                        fontWeight: 600,
                                        margin: '0 0 0 15px',
                                      }}
                                      align="right">
                                      $
                                      {(item.amount / 100).toFixed(2) *
                                        item.quantity}
                                    </p>
                                  </td>
                                )}
                                <td
                                  className="subtotal-spacer"
                                  style={{width: '40%'}}
                                />
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <table
                        className="row subtotal-lines"
                        style={{
                          width: '100%',
                          borderSpacing: 0,
                          borderCollapse: 'collapse',
                          marginTop: 15,
                          marginBottom: 35,
                          borderTop: '1px #e5e5e5 solid',
                        }}>
                        <tbody>
                          <tr>
                            <td
                              className="subtotal-spacer"
                              style={{width: '40%'}}
                            />
                            <td style={{}}>
                              <table
                                className="row subtotal-table"
                                style={{
                                  width: '100%',
                                  borderSpacing: 0,
                                  borderCollapse: 'collapse',
                                  marginTop: 20,
                                }}>
                                <tbody>
                                  <tr className="subtotal-line">
                                    <td
                                      className="subtotal-line__title"
                                      style={{padding: '5px 0'}}>
                                      <p
                                        style={{
                                          color: '#777',
                                          lineHeight: '1.2em',
                                          fontSize: 16,
                                          margin: 0,
                                        }}>
                                        <span style={{fontSize: 16}}>
                                          Subtotal
                                        </span>
                                      </p>
                                    </td>
                                    <td
                                      className="subtotal-line__value"
                                      style={{padding: '5px 0'}}
                                      align="right">
                                      <strong
                                        style={{
                                          fontSize: 16,
                                          color: '#555',
                                        }}>
                                        ${subTotal}
                                      </strong>
                                    </td>
                                  </tr>
                                  <tr className="subtotal-line">
                                    <td
                                      className="subtotal-line__title"
                                      style={{padding: '5px 0'}}>
                                      <p
                                        style={{
                                          color: '#777',
                                          lineHeight: '1.2em',
                                          fontSize: 16,
                                          margin: 0,
                                        }}>
                                        <span style={{fontSize: 16}}>
                                          Shipping
                                        </span>
                                      </p>
                                    </td>
                                    <td
                                      className="subtotal-line__value"
                                      style={{padding: '5px 0'}}
                                      align="right">
                                      <strong
                                        style={{
                                          fontSize: 16,
                                          color: '#555',
                                        }}>
                                        $0.00
                                      </strong>
                                    </td>
                                  </tr>
                                  <tr className="subtotal-line">
                                    <td
                                      className="subtotal-line__title"
                                      style={{padding: '5px 0'}}>
                                      <p
                                        style={{
                                          color: '#777',
                                          lineHeight: '1.2em',
                                          fontSize: 16,
                                          margin: 0,
                                        }}>
                                        <span style={{fontSize: 16}}>
                                          Taxes
                                        </span>
                                      </p>
                                    </td>
                                    <td
                                      className="subtotal-line__value"
                                      style={{padding: '5px 0'}}
                                      align="right">
                                      <strong
                                        style={{
                                          fontSize: 16,
                                          color: '#555',
                                        }}>
                                        $0.00
                                      </strong>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table
                                className="row subtotal-table subtotal-table--total"
                                style={{
                                  width: '100%',
                                  borderSpacing: 0,
                                  borderCollapse: 'collapse',
                                  marginTop: 20,
                                  borderTopWidth: 2,
                                  borderTopColor: '#e5e5e5',
                                  borderTopStyle: 'solid',
                                }}>
                                <tbody>
                                  <tr className="subtotal-line">
                                    <td
                                      className="subtotal-line__title"
                                      style={{padding: '20px 0 0'}}>
                                      <p
                                        style={{
                                          color: '#777',
                                          lineHeight: '1.2em',
                                          fontSize: 16,
                                          margin: 0,
                                        }}>
                                        <span style={{fontSize: 16}}>
                                          Total
                                        </span>
                                      </p>
                                    </td>
                                    <td
                                      className="subtotal-line__value"
                                      style={{padding: '20px 0 0'}}
                                      align="right">
                                      <strong
                                        style={{
                                          fontSize: 24,
                                          color: '#555',
                                        }}>
                                        ${subTotal} USD
                                      </strong>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              {totalDiscount ? (
                                <p
                                  className="total-discount"
                                  style={{
                                    color: '#777',
                                    lineHeight: '1.1',
                                    fontSize: 16,
                                    margin: '10px 0 0',
                                  }}
                                  align="right">
                                  You saved{' '}
                                  <span
                                    className="total-discount--amount"
                                    style={{
                                      fontSize: 16,
                                      color: '#555',
                                    }}>
                                    ${totalDiscount}
                                  </span>
                                </p>
                              ) : (
                                ''
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </center>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default EmailTable;

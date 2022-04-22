import React from 'react';
import EmailTable from './emailTable';

export const OrderEmail = ({session}) => {
  return (
    <div className="main-content">
      <table
        style={{
          height: '100% !important',
          width: '100% !important',
          borderSpacing: 0,
          borderCollapse: 'collapse',
          fontFamily: 'arial',
          background: '#fafafa',
        }}>
        <tbody>
          <tr>
            <td>
              <table
                className="row"
                style={{
                  width: '100%',
                  borderSpacing: 0,
                  borderCollapse: 'collapse',
                  margin: '40px 0 20px',
                }}>
                <tbody>
                  <tr>
                    <td>
                      <center>
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
                              <td className="shop-name__cell" style={{}}>
                                <img
                                  src="https://cdn.shopify.com/s/files/1/0480/0751/2215/email_settings/wigo-logo_140x.png"
                                  alt="Wigo"
                                  width={100}
                                />
                              </td>
                              <td
                                className="order-number__cell"
                                style={{
                                  textTransform: 'uppercase',
                                  fontSize: 14,
                                  color: '#999',
                                }}
                                align="right">
                                <span
                                  className="order-number__text"
                                  style={{fontSize: 16}}>
                                  Order #{session?.orderNo}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </center>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                className="row"
                style={{
                  width: '100%',
                  borderSpacing: 0,
                  borderCollapse: 'collapse',
                  margin: '40px 0 0',
                }}>
                <tbody>
                  <tr>
                    <td>
                      <center>
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
                                <h2
                                  style={{
                                    fontWeight: 'normal',
                                    fontSize: 24,
                                    margin: '0 0 10px',
                                  }}>
                                  Thank you for your purchase!{' '}
                                </h2>
                                <p
                                  style={{
                                    color: '#777',
                                    lineHeight: '150%',
                                    fontSize: 16,
                                    margin: 0,
                                  }}>
                                  Hi {session?.shippingAddress?.name}, we're
                                  getting your order ready to be shipped. We
                                  will notify you when it has been sent.
                                </p>
                                <table
                                  className="row actions"
                                  style={{
                                    width: '100%',
                                    borderSpacing: 0,
                                    borderCollapse: 'collapse',
                                    marginTop: 20,
                                  }}>
                                  <tbody>
                                    <tr>
                                      <td className="actions__cell" style={{}}>
                                        <table
                                          className="button main-action-cell"
                                          style={{
                                            borderSpacing: 0,
                                            borderCollapse: 'collapse',
                                            float: 'left',
                                            marginRight: 15,
                                          }}>
                                          <tbody>
                                            <tr>
                                              <td
                                                className="button__cell"
                                                style={{borderRadius: 4}}
                                                bgcolor="#000000"
                                                align="center">
                                                <a
                                                  href={`http://localhost:3000/order-details/${session?._id}`}
                                                  className="button__text"
                                                  style={{
                                                    fontSize: 16,
                                                    textDecoration: 'none',
                                                    display: 'block',
                                                    color: '#fff',
                                                    padding: '20px 25px',
                                                  }}>
                                                  View your order
                                                </a>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <table
                                          className="link secondary-action-cell"
                                          style={{
                                            borderSpacing: 0,
                                            borderCollapse: 'collapse',
                                            marginTop: 19,
                                          }}>
                                          <tbody>
                                            <tr>
                                              <td
                                                className="link__cell"
                                                style={{}}>
                                                or{' '}
                                                <a
                                                  href="http://localhost:3000/"
                                                  style={{
                                                    fontSize: 16,
                                                    textDecoration: 'none',
                                                    color: '#000000',
                                                  }}>
                                                  Visit our store
                                                </a>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
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

              <EmailTable session={session} />

              <table
                className="row section"
                style={{
                  width: '100%',
                  borderSpacing: 0,
                  borderCollapse: 'collapse',
                }}>
                <tbody>
                  <tr>
                    <td
                      className="section__cell"
                      style={{padding: '0 0 40px 0'}}>
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
                                  Customer information
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
                                    <tr>
                                      <td
                                        className="customer-info__item"
                                        style={{width: '50%'}}>
                                        <h4
                                          style={{
                                            fontWeight: 600,
                                            fontSize: 16,
                                            color: '#555',
                                            margin: '0 0 5px',
                                          }}>
                                          Shipping address
                                        </h4>
                                        <p
                                          style={{
                                            color: '#777',
                                            lineHeight: '150%',
                                            fontSize: 16,
                                            margin: 0,
                                          }}>
                                          {session?.shippingAddress?.name}
                                          <br />
                                          {
                                            session?.shippingAddress
                                              ?.shippingPhone
                                          }
                                          <br />
                                          {
                                            session?.shippingAddress
                                              ?.shippingAddress
                                          }
                                          <br />
                                          {
                                            session?.shippingAddress
                                              ?.shippingPostalCode
                                          }
                                          <br />
                                        </p>
                                      </td>
                                      <td
                                        className="customer-info__item"
                                        style={{
                                          width: '50%',
                                          verticalAlign: 'top',
                                        }}>
                                        <h4
                                          style={{
                                            fontWeight: 600,
                                            fontSize: 16,
                                            color: '#555',
                                            margin: '0 0 5px',
                                            verticalAlign: 'top',
                                          }}>
                                          Payment method
                                        </h4>
                                        <p
                                          className="customer-info__item-content"
                                          style={{
                                            color: '#777',
                                            lineHeight: '150%',
                                            fontSize: 16,
                                            margin: 0,
                                          }}>
                                          <span style={{fontSize: 16}}>
                                            ending with 4242—{' '}
                                            <strong
                                              style={{
                                                fontSize: 16,
                                                color: '#555',
                                              }}>
                                              $
                                              {(session?.totalPrice).toFixed(2)}
                                            </strong>
                                          </span>
                                        </p>
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
              <table
                className="row footer"
                style={{
                  width: '100%',
                  borderSpacing: 0,
                  borderCollapse: 'collapse',
                  borderTop: '1px #e5e5e5 solid',
                }}>
                <tbody>
                  <tr>
                    <td className="footer__cell" style={{padding: '35px 0'}}>
                      <center>
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
                              <td>
                                <p
                                  className="disclaimer__subtext"
                                  style={{
                                    color: '#999',
                                    lineHeight: '150%',
                                    fontSize: 14,
                                    margin: 0,
                                  }}>
                                  If you have any questions, reply to this email
                                  or contact us at{' '}
                                  <a
                                    href="mailto:accounts@codem.com"
                                    style={{
                                      fontSize: 14,
                                      textDecoration: 'none',
                                      color: '#000000',
                                    }}>
                                    accounts@codem.com
                                  </a>
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </center>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {listProductDetails, updateProduct} from '../../actions/productActions';
import {PRODUCT_UPDATE_RESET} from '../../constants/productConstants';
import {toast} from 'react-toastify';
const AdminEditProductPage = ({match, history}) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [status, setStatus] = useState(true);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);
  const {product} = productDetails;
  const {userInfo} = useSelector(state => state.userLogin);

  const productUpdate = useSelector(state => state.productUpdate);
  const {success: successUpdate} = productUpdate;

  useEffect(() => {
    if (userInfo) {
      if (successUpdate) {
        dispatch({type: PRODUCT_UPDATE_RESET});
        history.push('/admin/productlist');
      } else {
        if (!product.name || product._id !== productId) {
          dispatch(listProductDetails(productId));
        } else {
          setName(product.name);
          setPrice(product.price);
          setInventory(product.inventory);
          setSku(product.sku);
          setStatus(product.status);
          setDescription(product.description);
          setImage(product.image);
        }
      }
    }
  }, [dispatch, history, productId, product, successUpdate, userInfo]);
  // }, []);
  const submitHandler = e => {
    e.preventDefault();
    if (price > 0) {
      if (image) {
        dispatch(
          updateProduct({
            _id: productId,
            name,
            price,
            sku,
            status,
            image,
            description,
            inventory,
          })
        );
      } else toast.warn('Please Upload an Image');
    } else toast.warn('Price cannot be Zero');
  };

  const uploadFileHandler = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const {data} = await axios.post('/api/upload', formData, config);
      setImage(data);
    } catch (error) {
      toast.warn('Invalid Image Format');
    }
  };
  const [symbolsArr] = useState(['e', 'E', '+', '-', '.']);
  const [symbolsArrPrice] = useState(['e', 'E', '+', '-']);
  return (
    <section className="flex">
      <div className="container-fluid">
        <div className="admin-content">
          <div className="admin-left-nav mt-20">
            <ul>
              <li>
                <Link className="active" to="/admin/productlist">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/admin/orderlist">Orders</Link>
              </li>
              <li>
                <Link to="/admin/discountlist">Discount</Link>
              </li>
            </ul>
          </div>
          <div className="admin-right page-content">
            <div className="products-list">
              <form onSubmit={submitHandler}>
                <div className="actions flex items-center">
                  <h3>{name}</h3>
                  <button
                    type="submit"
                    className="button button--hollow  justify-end inline-block">
                    Update
                  </button>
                </div>
                <div className="edit-product">
                  <div className="flex">
                    <div className="product-lineitems form-section">
                      <div className="form-control">
                        <label htmlFor="product-name">Product Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={e => setName(e.target.value)}
                        />
                      </div>
                      <div className="form-control">
                        <label htmlFor="sku">SKU</label>
                        <input
                          type="text"
                          value={sku}
                          onChange={e => setSku(e.target.value)}
                        />
                      </div>
                      <div className="flex">
                        <div className="form-control pr-10">
                          <label htmlFor="price">Price ($)</label>
                          <input
                            type="number"
                            min="1"
                            onKeyDown={e =>
                              symbolsArrPrice.includes(e.key) &&
                              e.preventDefault()
                            }
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                          />
                        </div>
                        <div className="form-control pl-10">
                          <label htmlFor="inventory">Inventory</label>
                          <input
                            type="number"
                            min="0"
                            onKeyDown={e =>
                              symbolsArr.includes(e.key) && e.preventDefault()
                            }
                            value={inventory}
                            onChange={e => setInventory(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-control">
                        <label htmlFor="status">Product Status</label>
                        <div className="mt-10">
                          <span className="pr-20">
                            <input
                              type="radio"
                              checked={status}
                              name="status"
                              onChange={e => setStatus(true)}
                            />{' '}
                            Active
                          </span>
                          <span>
                            <input
                              type="radio"
                              name="status"
                              checked={!status}
                              onChange={e => setStatus(false)}
                            />{' '}
                            Inactive
                          </span>
                        </div>
                      </div>
                      <div className="form-control">
                        <label htmlFor="description">Description</label>
                        <textarea
                          cols="5"
                          rows="10"
                          onChange={e => setDescription(e.target.value)}
                          value={description}></textarea>
                      </div>
                      <button
                        type="submit"
                        className="button button--hollow  justify-end inline-block">
                        Update
                      </button>
                    </div>
                    <div className="product-imageitem">
                      <div id="wrapper">
                        <label htmlFor="description">Product Image</label>
                        <div className="mt-10">
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {image ? 'Click image to remove' : ''}
                            </span>
                            {!image ? (
                              <label htmlFor="image-file" className="drop-zone">
                                <input
                                  type="file"
                                  id="image-file"
                                  className="drop-zone__input"
                                  onChange={uploadFileHandler}
                                />
                                Drop file here or click to upload
                              </label>
                            ) : (
                              <img
                                alt={name}
                                src={image}
                                onClick={() => setImage()}
                                className="drop-zone"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AdminEditProductPage;

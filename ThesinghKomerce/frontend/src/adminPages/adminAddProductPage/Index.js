import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Nav} from './Nav';
import {createProduct} from '../../actions/productActions';
import {ImageUpload} from './imageUpload';
import {toast} from 'react-toastify';

const AdminAddProductPage = ({history}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [sku, setSku] = useState();
  const [price, setPrice] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [status, setStatus] = useState(true);
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const {productCreateSuccess} = useSelector(state => state.productCreate);
  const {userInfo} = useSelector(state => state.userLogin);
  useEffect(() => {
    if (userInfo && !userInfo.isAdmin) history.push('/');
  }, [userInfo, history]);
  useEffect(() => {
    if (userInfo && productCreateSuccess) history.push('/admin/productlist');
  }, [productCreateSuccess, userInfo, history]);

  const submitHandler = e => {
    e.preventDefault();
    if (price > 0) {
      if (image) {
        dispatch(
          createProduct({
            name,
            sku,
            price,
            image,
            status,
            description,
            inventory,
          })
        );
      } else toast.warn('Please Upload an Image');
    } else toast.warn('Price cannot be Zero');
  };

  const [symbolsArr] = useState(['e', 'E', '+', '-', '.']);
  const [symbolsArrPrice] = useState(['e', 'E', '+', '-']);

  return (
    <section className="flex">
      <div className="container-fluid">
        <div className="admin-content">
          <Nav />
          <div className="admin-right page-content">
            <div className="products-list">
              <form onSubmit={submitHandler}>
                <div className="actions flex items-center">
                  <h3>Add Product</h3>
                  <button
                    type="submit"
                    className="button button--hollow  justify-end inline-block">
                    Save
                  </button>
                </div>
                <div className="edit-product">
                  <div className="flex">
                    <div className="product-lineitems form-section">
                      <div className="form-control">
                        <label htmlFor="product-name">Product Name</label>
                        <input
                          type="text"
                          onChange={e => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-control">
                        <label htmlFor="sku">SKU</label>
                        <input
                          type="text"
                          onChange={e => setSku(e.target.value)}
                          required
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
                            onChange={e => {
                              setPrice(e.target.value);
                            }}
                            required
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
                            onChange={e => setInventory(e.target.value)}
                            required
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
                          value={description}
                          required></textarea>
                      </div>
                      <button
                        type="submit"
                        className="button button--hollow  justify-end inline-block">
                        Save
                      </button>
                    </div>

                    <ImageUpload
                      image={image}
                      name={name}
                      setImage={setImage}
                    />
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
export default AdminAddProductPage;

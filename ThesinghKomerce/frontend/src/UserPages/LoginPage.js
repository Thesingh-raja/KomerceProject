import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../actions/userActions';
import '../css/style.css';
import {session} from '../actions/userActions';
import {toast} from 'react-toastify';
import validator from 'validator';

const LoginPage = ({location, history}) => {
  const dispatch = useDispatch();
  const {error, userInfo} = useSelector(state => state.userLogin);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!userInfo) dispatch(session());
  }, [userInfo]);

  useEffect(() => {
    if (userInfo) {
      if (userInfo.isAdmin) history.push('/admin/productlist');
      else if (!userInfo.isAdmin) history.push('/home');
      else history.push('/');
    } else history.push('/');
  }, [history, userInfo]);

  const submitHandler = e => {
    e.preventDefault();
    if (validator.isEmail(email)) {
      dispatch(login(email, password));
    } else toast.warn('Invalid EmailId');
  };
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);
  return (
    <>
      <div className="form-container sign-up-container">
        <form onSubmit={submitHandler}>
          <h1>Login</h1>
          <div className="form-control">
            <label htmlFor="name">Email Address</label>
            <input
              type="email"
              placeholder=""
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="name">Enter Password</label>
            <input
              type="password"
              placeholder=""
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="button button--hollow  justify-end inline-block"
            type="submit"
            variant="primary">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;

import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import {login} from '../actions/userActions';
import '../css/style.css';
import {session} from '../actions/userActions';
import {toast} from 'react-toastify';

const LoginPage = ({location, history}) => {
  const dispatch = useDispatch();
  const {loading, error, userInfo} = useSelector(state => state.userLogin);
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
  // }, [userInfo]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);
  return (
    <>
      <div className="form-container sign-up-container">
        <form onSubmit={submitHandler}>
          <h1>Login</h1>
          {/* {error ? <Message>{error}</Message> : ''} */}
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

import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../actions/userActions';
import {toast} from 'react-toastify';
import validator from 'validator';
const RegisterPage = ({location, history}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const userRegister = useSelector(state => state.userRegister);
  const {userInfo} = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push('/home');
    }
  }, [history, userInfo]);

  const submitHandler = e => {
    e.preventDefault();
    if (validator.isEmail(email)) {
      if (password !== confirmPassword) {
        toast.clearWaitingQueue();
        toast.warn('Passwords do not match');
      } else {
        dispatch(register(email, password));
      }
    } else toast.warn('Invalid EmailId');
  };

  return (
    <section>
      <div className="form-container sign-up-container">
        <form onSubmit={submitHandler}>
          <h1>Create Account</h1>
          <div className="form-control">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              placeholder=""
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Enter Password</label>
            <input
              type="password"
              placeholder=""
              onChange={e => {
                setPassword(e.target.value);
              }}
              minLength="8"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type="password"
              placeholder=""
              onChange={e => {
                setConfirmPassword(e.target.value);
              }}
              required
            />
          </div>
          <button type="submit" className="button checkout_btn button--hollow">
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;

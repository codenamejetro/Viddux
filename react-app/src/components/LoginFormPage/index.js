import React, { useState } from "react";
import { login, signUp } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoHandler = () => {
    console.log('hi')
    dispatch(login('demo@aa.io', 'password'))
  }

  return (
    <>
      <div className="login-wrapper">
        <div className="login-wrapper-inner">
          <h1>Welcome back!</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-errors-div">
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}

            </div>
            {/* <div></div> */}
            <input
              className="login-email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              password='Enter your email'
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />

            <div className="login-bottom">
              <div className="login-bottom-top">
                <button type="submit">Sign in</button>
              </div>
              <div className="login-bottom-bottom">
                <NavLink className='login-signup' to='/signup'>
                  Don't have an account?
                </NavLink>
                <div onClick={demoHandler}>Demo</div>
              </div>
            </div>
          </form>

        </div>
      </div>
    </>
  );
}

export default LoginFormPage;

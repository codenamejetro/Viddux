import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [displayErrors, setDisplayErrors] = useState(false)


  useEffect(() => {
    const errors = {}
    if (!firstName) errors.firstName = "First name is required"
    if (!lastName) errors.lastName = "Last name is required"
    if (!username) errors.username = "Username is required"
    if (username.length < 4) errors.usernameLengthSmall = "Username is under 4 characters"
    if (username.length > 20) errors.usernameLengthLarge = "Username is over 20 characters"
    if (!email.includes('@')) errors.email = "Invalid Email"
    if (!password) errors.password = "Password is required"
    if (confirmPassword !== password) errors.confirmPassword = 'Passwords must match'
    setErrors(errors)
  }, [firstName, lastName, email, username, password, confirmPassword])


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('1')
    if (!Object.values(errors)) {
      setDisplayErrors(true)
      console.log('2', errors)
    } else {
      const data = await dispatch(signUp(firstName, lastName, username, email, password));
      console.log('3')
      history.push('/')
    }
  };

  if (sessionUser) return <Redirect to="/" />;

  return (
    <>
      <div className='signup-wrapper'>
        <div className='signup-wrapper-inner'>

          <div className='signup-content'>
            <form onSubmit={handleSubmit}
              className='signup-form'
            >
              <h1>Sign Up</h1>
              <h4 className='signup-form-h4'>Just a few steps...</h4>
              {/* <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
              </ul> */}

              <div className='signup-form-names signup-form-divs'>
                <div className='signup-form-divs-inner'>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder='First name'></input>
                  {displayErrors && errors.firstName && (<div className="signup-errors">· {errors.firstName}</div>)}

                </div>

                <div className='signup-form-divs-inner'>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder='Last name'></input>
                  {displayErrors && errors.lastName && (<div className="signup-errors">· {errors.lastName}</div>)}

                </div>

              </div>

              <div className='signup-form-credentials signup-form-divs'>
                <div className='signup-form-divs-inner'>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Username'

                  />
                  {displayErrors && errors.username && (<div className="signup-errors">· {errors.username}</div>)}

                </div>

                <div className='signup-form-divs-inner'>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                  />
                  {displayErrors && errors.email && (<div className="signup-errors">· {errors.email}</div>)}

                </div>
              </div>

              <div className='signup-form-passwords signup-form-divs'>
                <div className='signup-form-divs-inner'>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                  />
                  {displayErrors && errors.password && (<div className="signup-errors">· {errors.password}</div>)}
                </div>
                <div className='signup-form-divs-inner'>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder='Confirm password'
                  />
                  {displayErrors && errors.confirmPassword && (<div className="signup-errors">· {errors.confirmPassword}</div>)}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h5 style={{ fontSize: '12px', color: 'red', marginTop:'-5px' }}>*</h5>
                <h5 style={{marginTop:'-5px'}}>&nbsp;Required Fields</h5>
              </div>

              <div className='signup-form-bottom'>
                <NavLink className='nav-link signup-form-bottom-login' to='/login'>Already have an account?</NavLink>
                <button onClick={handleSubmit} type="submit">Sign Up</button>
              </div>
            </form>


            <div className='signup-content-right'>

            </div>


          </div>
        </div>
      </div>
    </>
  );
}

export default SignupFormPage;

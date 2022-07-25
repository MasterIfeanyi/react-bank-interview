import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../auth/authSlice";
import { useLoginMutation } from "./authApiSlice"

const Login = () => {


    // create a navigate function from useNavigate
    const navigate = useNavigate();
    // dispatch action to store
    const dispatch = useDispatch();
    // get login function 
    const [login] = useLoginMutation();

    // used to set focus when component mounts
    const userRef = useRef()
    const errRef = useRef()

    // state for error, password, username
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    // set the focus when component mounts
    useEffect(() => {
        userRef.current.focus()
    }, []);

    // clear the error message if username and password changes
    useEffect(() => {
        setErrMsg('')
    }, [user, pwd]);



    // handle User input
    const handleUserInput = (e) => setUser(e.target.value)
    const handlePwdInput = (e) => setPwd(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!user && !pwd) return
        // if button enabled with JS Hack
        try {
            const userData = await login({ user, pwd }).unwrap();
            // save accessToken to global store
            dispatch(setCredentials({ ...userData, user }))
            // clear the form
            setUser("");
            setPwd("");
            navigate("/account");
        } catch (err) {
            if (!err?.originalStatus) {
                setErrMsg('No Server Response'); // server is off
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.originalStatus === 401) {
                setErrMsg('User not found');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus(); // set the focus on the error message for screen readers
        }
    }    

  return (
    <section className="section">
        <div className="container">
            <div className="row">
                <div className="col-12 intro text-center">
                    <h3 className="mt-4">Login</h3>
                    <p className="lead">Please login to access the application</p>
                </div>
            </div>

            <div className="row d-flex justify-content-center">
                  <div className="col-lg-7">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <form className="row" onSubmit={handleSubmit}>
                        <div className="form-group col-12">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text" 
                                id="username"
                                className="form-control"
                                value={user}
                                onChange={handleUserInput}
                                autoComplete="off"
                                required
                                placeholder="Enter your username"
                                ref={userRef}
                            />
                        </div>

                        <div className="form-group col-12">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password" 
                                id="password"
                                className="form-control"
                                value={pwd}
                                onChange={handlePwdInput}
                                autoComplete="off"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                          
                        <div className="text-center">
                            <button className="btn btn-primary form-button">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col-12 intro">
                    <div className="d-sm-flex mt-2 justify-content-center align-items-center text-center lead">
                        <small className="me-4">Don't have an account ?</small>
                        <Link to="/register">
                            <button className="btn btn-primary form-button">Register</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Login
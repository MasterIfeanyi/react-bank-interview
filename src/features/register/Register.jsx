import { useState, useRef, useEffect } from 'react';
import { FaTimes, FaCheck, FaInfoCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "../auth/authSlice";
import { useRegisterMutation } from './registerApiSlice';


const USER_REGEX = /^[a-zA-z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {

    // create a navigate function from useNavigate
    const navigate = useNavigate();
    // dispatch action to store
    const dispatch = useDispatch();
    // get login function and isLoading 
    const [register] = useRegisterMutation();

    // username state
    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    // password state
    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    // error message state
    const [errMsg, setErrMsg] = useState("");

    // confirm password state
    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);


    // REGEX

    // check if username conforms to the RegEx
    useEffect(() => {
        const result = USER_REGEX.test(user); // return true or false
        setValidName(result);
    }, [user])

    // check if both password matches
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    // clear out the error message when dependency array changes
    useEffect(() => {
        setErrMsg("");
    }, [user, pwd, matchPwd])


    // used to set focus
    const userRef = useRef();
    const errRef = useRef();

    // when component mounts set focus on username input field
    useEffect(() => {
        userRef.current.focus();
    }, []);


    // handle User input
    const handleUserInput = (e) => setUser(e.target.value);
    const handlePwdInput = (e) => setPwd(e.target.value);
    const handlePwdMatch = (e) => setMatchPwd(e.target.value);

    // submit function 
    const handleSubmit = async(e) => {
        e.preventDefault();
        // if button enabled with JS Hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try{
            const userData = await register({ user, pwd }).unwrap();
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
                setErrMsg('Unauthorized');
            } else if (err.originalStatus === 409) {
                setErrMsg('user already exists');
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
                    <h3 className="mt-4">Register</h3>
                    <p className="lead">Please register to access the application</p>
                </div>
            </div>
              

            <div className="row d-flex justify-content-center">
                <div className="col-lg-7">
                    <p ref={errRef} aria-live="assertive" className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                    <form className="row" onSubmit={handleSubmit}>
                        <div className="form-group col-12">
                            <label htmlFor="username">Username:
                                <span className={validName ? "valid" : "hide"}><FaCheck /></span>
                                <span className={validName || !user ? "hide" : "invalid"}><FaTimes /></span>
                            </label>
                            <input 
                                type="text" 
                                className="form-control"
                                id="username"
                                ref={userRef}
                                value={user}
                                onChange={handleUserInput}
                                autoComplete="off"
                                required
                                placeholder="Enter your username"
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                                <FaInfoCircle />
                                4 to 24 characters. <br />
                                Must begin with a letter. <br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p>
                        </div>
                        <div className="form-group col-12">
                            <label htmlFor="password">Password:
                                <span className={validPwd ? "valid" : "hide"}><FaCheck /></span>
                                <span className={validPwd || !pwd ? "hide" : "invalid"}><FaTimes /></span>
                            </label>
                            <input 
                                type="password" 
                                className="form-control"
                                id="password"
                                value={pwd}
                                onChange={handlePwdInput}
                                autoComplete="off"
                                placeholder="Enter your password"
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                <FaInfoCircle />
                                8 to 24 characters. <br />
                                Must include uppercase and lowercase letters, a number and a special character. <br />
                                Allowed  special characters: <span aria-label='exclamation mark'>!</span> <span aria-label="at symbol">@</span> <span aria-label='dollar sign'>$</span> <span aria-label='hashtag'>#</span> <span aria-label='percent'>%</span>
                            </p>    
                        </div>
                        
                        <div className="form-group col-12">
                            <label htmlFor="confirm_pwd">Confirm Password:
                                <span className={validMatch && matchPwd ? "valid" : "hide"}>
                                    <FaCheck />
                                </span>
                                <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                                    <FaTimes />
                                </span>
                            </label>
                            <input
                                value={matchPwd}
                                onChange={handlePwdMatch}
                                type="password"
                                id="confirm_pwd"
                                placeholder='Please confirm your password'
                                className="form-control"
                                autoComplete='off'
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <FaInfoCircle />
                                Must match the first password input field.
                            </p>
                        </div>  

                        <div className="text-center">
                            <button disabled={!validName || !validPwd || !validMatch ? true : false} className="btn btn-primary form-button">Submit</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="row">
                <div className="col-12 intro">
                    <div className="d-sm-flex mt-2 justify-content-center align-items-center text-center lead">
                        <small className="me-4">Already have an account ?</small>
                        <Link to="/login">
                            <button className="btn btn-primary form-button">Login</button>
                        </Link>
                    </div>
                </div>
            </div> 

              
        </div>
    </section>
  )
}

export default Register
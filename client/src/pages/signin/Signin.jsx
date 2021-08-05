import React, { useState } from 'react'
import './signin.css'
import { useHistory } from 'react-router';
import { CircularProgress } from '@material-ui/core'

export default function Signin() {


    const [errors, setErrors] = useState("");
    const [user, setUser] = useState({ email: "", password: ""})
    const [isFetching, setIsFetching] = useState(false);
    const history = useHistory();


    const gotoSignup = (e) => {
        e.preventDefault();
        history.push('/signup')
    }
    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value });
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
    }
    
    return (
        <div className="loginContainer">
            <div className="loginWrapper">
                <form className="loginRight" onSubmit={handleSubmit} >
                    <div className="loginBox">
                        {errors ?
                            <div className="errorDiv">
                                <span className="errorMessage">{errors}</span>
                            </div> : null}
                        
                        <div className="divinput" > 
                        <input type="email" required  className="loginInput" 
                        name="email" 
                        value={user.email} 
                        onChange={handleChange} />
                        <label for="email">Email</label>
                        </div>
                        
                        <div className="divinput" > 
                        <input type="password" required   className="loginInput" 
                        name="password" 
                        value={user.password} 
                        onChange={handleChange} />
                        <label for="">Password</label>
                        </div>

                        <button type="submit" 
                        className="loginButton" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="20px" /> : "Log In"}</button>
                        <span className="loginForgot">Forgot password?</span>
                        <button onClick={gotoSignup} className="loginRegisterButton" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="20px" /> : "Create New Account"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
import React, { useState } from 'react'
import './signup.css'
import { useHistory } from 'react-router';
import { CircularProgress } from '@material-ui/core'

export default function Signup() {


    const [errors, setErrors] = useState("");
    const [user, setUser] = useState({ firstname: "", lastname: "", email: "", password: "", cpassword: "" })
    const [isFetching, setIsFetching] = useState(false);
    const history = useHistory();


    const gotoLogin = (e) => {
        e.preventDefault();
        history.push('/signin')
    }
    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value });
    }

    return (
        <div className="loginContainer">
            <div className="loginWrapper">
                <form className="loginRight" /* onSubmit={handleSubmit} */ >
                    <div className="loginBox">
                        {errors ?
                            <div className="errorDiv">
                                <span className="errorMessage">{errors}</span>
                            </div> : null}


                        <input type="text" required placeholder="First name" className="loginInput" name="firstname" value={user.firstname} onChange={handleChange} />
                        <input type="text" required placeholder="Last name" className="loginInput" name="lastname" value={user.lastname} onChange={handleChange} />
                        <input type="email" required placeholder="Email" className="loginInput" name="email" value={user.email} onChange={handleChange} />
                        <input type="password" required placeholder="Password" className="loginInput" name="password" value={user.password} onChange={handleChange} />
                        <input type="password" required placeholder="Confirm password" className="loginInput" name="cpassword" value={user.cpassword} onChange={handleChange} />
                        <button type="submit" className="loginButton" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="20px" /> : "Sign Up"}</button>
                        <button onClick={gotoLogin} className="loginRegisterButton" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="20px" /> : "Log Into Account"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
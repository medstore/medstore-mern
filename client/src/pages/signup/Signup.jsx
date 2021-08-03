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
    const handleSubmit = (e)=>{
        e.preventDefault();
        history.push('/')
    }
    
    return (
        <div className="signupContainer">
            <div className="signupWrapper">
                <form className="signupRight" onSubmit={handleSubmit} >
                    <div className="signupBox">
                        {errors ?
                            <div className="errorDiv">
                                <span className="errorMessage">{errors}</span>
                            </div> : null}
                        <div className="divinput" > 
                        <input type="text" required   
                        className="signupInput" 
                        name="firstname" 
                        value={user.firstname} 
                        onChange={handleChange} />
                        <label for="">First name</label>
                        </div>

                        <div className="divinput" > 
                        <input type="text" required  
                        className="signupInput" 
                        name="lastname" 
                        value={user.lastname} 
                        onChange={handleChange} />
                        <label for="">Last name</label>
                        </div>
                        
                        <div className="divinput" > 
                        <input type="email" required  className="signupInput" 
                        name="email" 
                        value={user.email} 
                        onChange={handleChange} />
                        <label for="email">Email</label>
                        </div>
                        
                        <div className="divinput" > 
                        <input type="password" required   className="signupInput" 
                        name="password" 
                        value={user.password} 
                        onChange={handleChange} />
                        <label for="">Password</label>
                        </div>
                        
                        <div className="divinput" > 
                        <input type="password" required  className="signupInput" 
                        name="cpassword" 
                        value={user.cpassword} 
                        onChange={handleChange} />
                        <label for="">Confirm Password</label>
                        </div>

                        <button type="submit" 
                        className="signupButton" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="20px" /> : "Sign Up"}</button>
                        
                        <button onClick={gotoLogin} className="loginRegisterButton" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="20px" /> : "Log Into Account"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
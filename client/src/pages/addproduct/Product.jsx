// Stote id ;
//product img
//prod name
//prod desc
//product mrp
//product price
//prodcut details
// var userid ="61445f7bc4a00a3a18e0eee5";
// var createstoreid="1233";
import React , { useContext , useState } from 'react'
import './product.css'
import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router';
import axios from "axios";
import { AppContext } from '../../context/appContext/AppContext';
const Product = () => {
    const { user } = useContext(AppContext);
    const [product, setProduct] = useState({ img:"", title: "", desc: "", price: "", details: ""})
    const [errors, setErrors] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const history = useHistory();

    const gotoProduct = (e) => {
        e.preventDefault();
        history.push('/')
    }
    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setProduct({ ...product, [name]: value });
    }

console.log(user)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsFetching(true)
        setErrors(false);
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}` 
            }
        }

        try {
            const { data } = await axios.post(`/api/private/product`, { ...product,  userId: user._id }, config).catch(err => {
                if (err.response.status === 409) {
                    setErrors("Invalid User")
                    throw new Error(`Invalid User`);
                } 
                else {
                    setErrors("Internal Server Error")
                    throw new Error(`Internal Server Error`);
                }
                throw err;
            });
            setIsFetching(false);
        } catch (err) {
            setIsFetching(false);
            setErrors(err.message)
        }
    }

    return (
        <div className="productContainer">
            <div className="productWrapper">
                <form className="productRight" onSubmit={handleSubmit} >
                    <div className="productBox">
                    <h1>Add Product</h1>
                        {errors ?
                            <div className="errorDiv">
                                <span className="errorMessage">{errors}</span>
                            </div> : null}
                        

                        <div className="divinput" > 
                        <input type="text" required  
                        className="productInput" 
                        name="title" 
                        value={product.title} 
                        onChange={handleChange} />
                        <label for="">Title</label>
                        </div>
                        
                        <div className="divinput" > 
                        <input type="text" required  className="productInput" 
                        name="desc" 
                        value={product.desc} 
                        onChange={handleChange} />
                        <label for="desc">Description</label>
                        </div>
                        
                        <div className="divinput" > 
                        <input type="text" required   
                        className="productInput" 
                        name="img" 
                        value={product.img} 
                        onChange={handleChange} />
                        <label for="">Image Url</label>
                        </div>
              
                        <div className="divinput" > 
                        <input type="number" required   className="productInput" 
                        name="price" 
                        value={product.price} 
                        onChange={handleChange} />
                        <label for="">Price</label>
                        </div>
                        
                        <div className="divinput" > 
                        <input type="text" required  className="productInput" 
                        name="details" 
                        value={product.details} 
                        onChange={handleChange} />
                        <label for="">Details</label>
                        </div>

                         
                        <button onClick={gotoProduct} className="loginRegisterButton" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="20px" /> : "Add Product"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Product


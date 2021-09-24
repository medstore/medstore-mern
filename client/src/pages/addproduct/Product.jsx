// Stote id ;
//product img
//prod name
//prod desc
//product mrp
//product price
//prodcut details
// var userid ="61445f7bc4a00a3a18e0eee5";
// var createstoreid="1233";
import React , { useState } from 'react'
import './product.css'
import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router';

const Product = () => {
    const [product, setProduct] = useState({ img:"", title: "", desc: "", price: "", details: ""})
    const [errors, setErrors] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const history = useHistory();

    const gotoProduct = (e) => {
        e.preventDefault();
        history.push('/home')
    }
    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setProduct({ ...product, [name]: value });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsFetching(true)
        setErrors(false);
        const config = {
            headers: {
                 
            }
        }

        try {
             
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
                        <input type="file" required   
                        className="productInput" 
                        name="img" 
                        value={product.img} 
                        onChange={handleChange} />
                        <label for=""></label>
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


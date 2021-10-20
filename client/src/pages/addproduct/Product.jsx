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
    const [product, setProduct] = useState({ productName: "", productDescription: "", productImage:"", productPrice: NaN, productDetails: ""})
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
            const { data } = await axios.post(`/api/private/storedashboard/addstoreproduct`, { ...product,  userId: user._id, storeId: user.storeId}, config).catch(err => {
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
        alert('Product Added Successfully')
        setProduct({ productName: "", productDescription: "", productImage:"", productPrice: NaN, productDetails: ""})

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
                        name="productName" 
                        value={product.productName} 
                        onChange={handleChange} />
                        <label for="">Title</label>
                        </div>
                        
                        <div className="divinput" > 
                        <input type="text" required  className="productInput" 
                        name="productDescription" 
                        value={product.productDescription} 
                        onChange={handleChange} />
                        <label for="">Description</label>
                        </div>
                        
                        <div className="divinput" > 
                        <input type="text" required   
                        className="productInput" 
                        name="productImage" 
                        value={product.productImage} 
                        onChange={handleChange} />
                        <label for="">Image Url</label>
                        </div>
              
                        <div className="divinput" > 
                        <input type="number" required   className="productInput" 
                        name="productPrice" 
                        value={product.productPrice} 
                        onChange={handleChange} />
                        <label for="">Price</label>
                        </div>
                        
                        <div className="divinput" > 
                        <input type="text" required  className="productInput" 
                        name="productDetails" 
                        value={product.productDetails} 
                        onChange={handleChange} />
                        <label for="">Details</label>
                        </div>

                         
                        <button type="submit"  className="productButton" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="20px" /> : "Add Product"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Product;


import React ,{ useContext,useEffect, useState , } from 'react'
import './analytics.css'
import { useHistory } from 'react-router';
import { Link } from "react-router-dom";
import axios from "axios";
import { AppContext } from '../../context/appContext/AppContext';
import { Line } from "react-chartjs-2";
const Analytics = () => {


    const { user } = useContext(AppContext);
    const [errors, setErrors] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const history = useHistory();
    const [order, setOrder] = useState([{ ownerId: "", storeId: "", productId:"", status: "", quantity: ""}])
    const [product, setProduct] = useState([{ productName: "abcdd", productDescription: "", productImage:"", productPrice: NaN, productDetails: ""}])
    
    
    useEffect(() => {   
     
      
        if(user) 
        {
            const analytics = async () => {
             
            setIsFetching(true)
            setErrors(false);
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }
       
            // console.log(user.storeId)
            try {
                const { data } = await axios.post(`/api/private/storedashboard/analytics`, {storeId : user.storeId} , config).catch(err => {
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
                setOrder(data.orders)
                setProduct(data.products)
                setIsFetching(false);
            } catch (err) {
                 
                setErrors(err.message)
            }
        }
        analytics()
        }
       
  },[user])
 
    let totalPrice = 0;
    product &&
    product.forEach((item) => {
        totalPrice += parseFloat(item.productPrice);
      });
 
   
  const lineState = {
    labels: ["Initial Price", "Total Price"],
    datasets: [
      {
        label: "TOTAL PRICE",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalPrice],
      },
    ],
  };
   
    return (
        
        <div className="dashboard">
       
      <div className="dashboardContainer">
        <h1>Analytics</h1>
        {errors ?
            <div className="errorDiv">
            <span className="errorMessage">{errors}</span>
            </div> : null}
        <div className="dashboardSummary">
          <div>
             
            <p>
              Total Product Price <br /> ₹{totalPrice}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="">
              <p>Product</p>
              <p>{product && product.length}</p>
            </Link>
            <Link to="">
              <p>Orders</p>
              <p>{order && order.length}</p>
            </Link>
             
          </div> 
        </div>
 
        <div className="lineChart">
          <Line data={lineState} />
        </div>
         
      </div>
    </div>
    )
}

export default Analytics;


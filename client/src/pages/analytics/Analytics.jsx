import React ,{ useContext,useEffect, useState , } from 'react'
import './analytics.css'
import { useHistory } from 'react-router';
import { Link } from "react-router-dom";
import axios from "axios";
import { AppContext } from '../../context/appContext/AppContext';
import { Line , Doughnut} from "react-chartjs-2";
const Analytics = () => {


    const { user } = useContext(AppContext);
    const [errors, setErrors] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const history = useHistory();
    const [order, setOrder] = useState([{ ownerId: "", storeId: "", productId:"", status: "", quantity: "" , totalPrice:""}])
    const [product, setProduct] = useState([{ productName: "abcdd", productDescription: "", productImage:"", productPrice: NaN, productDetails: "" , productQuantity:""}])
    
    
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
 
    let totalSalesPrice = 0;
    order &&
    order.forEach((item) => {
        totalSalesPrice += parseFloat(item.totalPrice);
      });
 
  
  let outOfStock = 0;

  product &&
    product.forEach((item) => {
      if (item.productQuantity === "0") {
        outOfStock += 1;
      }
    });
  
     
  const lineState = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "SALES",
        lineTension: 0.9,
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, product.length - outOfStock],
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
              Total Sales Price <br /> ₹{totalSalesPrice}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="">
              <p>Total Products</p>
              <p>{product && product.length}</p>
            </Link>
            <Link to="">
              <p>Orders Delivered</p>
              <p>{order && order.length}</p>
            </Link>
             
          </div> 
        </div>
        <div className="doughnutChart">
        <h2>Product Stock</h2>
          <Doughnut data={doughnutState}  />
        </div>
        <div className="lineChart">
          <Line data={lineState} />
        </div>
        
      </div>
    </div>
    )
}

export default Analytics;


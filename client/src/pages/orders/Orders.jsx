import React ,{ useContext,useEffect, useState , } from 'react'
import './orders.css'
import { useHistory } from 'react-router';
import axios from "axios";
import { AppContext } from '../../context/appContext/AppContext';
 
const Orders = () => {


    const { user } = useContext(AppContext);
    const [errors, setErrors] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const history = useHistory();
    
    
    
    useEffect(() => {   
     
      
        if(user) 
        {
            const orderData = async () => {
             
            setIsFetching(true)
            setErrors(false);
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }
       
            console.log(user.storeId)
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
                setIsFetching(false);
            } catch (err) {
                 
                setErrors(err.message)
            }
        }
        orderData()
        }
       
  },[user])

  
    return (
        <div>
            <h1>Order Page</h1>
             

        </div>
    )
}

export default Orders;



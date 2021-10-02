import React ,{ useContext,useEffect, useState , } from 'react'
import './analytics.css'
import { useHistory } from 'react-router';
import axios from "axios";
import { AppContext } from '../../context/appContext/AppContext';
 
const Analytics = () => {


    const { user } = useContext(AppContext);
    const [errors, setErrors] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const history = useHistory();
    
    
    
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
                setIsFetching(false);
            } catch (err) {
                 
                setErrors(err.message)
            }
        }
        analytics()
        }
       
  },[user])

  
    return (
        <div>
            <h1>Analytics Page</h1>
             

        </div>
    )
}

export default Analytics;


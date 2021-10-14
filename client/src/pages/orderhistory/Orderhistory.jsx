import axios from 'axios'
import react from 'react'
import { useEffect, useContext} from 'react'
import { useState } from 'react'
import ItemHistoryCard from '../../components/itemhistorycard/ItemHistoryCard'
import { AppContext } from '../../context/appContext/AppContext'
import './orderhistory.css'

export default function Orderhistory() {

    const { user } = useContext(AppContext);

    useEffect(()=>{
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        }
        const fetchdata = async()=>{
            try{
                const {res} = axios.get('/api/private/getallcartitem', { userId: user._id }, config).catch(err => {
                    if (err.response.status === 404) {
                        throw new Error(`Product Not Found`);
                    }
                    else {
                        throw new Error(`Internal Server Error`);
                    }
                    throw err;
                });
                console.log(res)
            }catch(err){
                console.log("Error Occured")
            }
        }
        fetchdata();
    },[user])

    return (
        <div className="orderhistory">
            <div className="orderHistoryWrapper">
                <ItemHistoryCard/>
                <ItemHistoryCard/>
                <ItemHistoryCard/>
                <ItemHistoryCard/>
                <ItemHistoryCard/>
                <ItemHistoryCard/>
            </div>
        </div>
    )
}
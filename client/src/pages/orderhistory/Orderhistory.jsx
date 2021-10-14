import axios from 'axios'
import react from 'react'
import { useEffect, useContext} from 'react'
import { useState } from 'react'
import ItemHistoryCard from '../../components/itemhistorycard/ItemHistoryCard'
import { AppContext } from '../../context/appContext/AppContext'
import './orderhistory.css'

export default function Orderhistory() {

    const { user } = useContext(AppContext);
    const [orders, setOrders] = useState([]);

    useEffect(()=>{
        const fetchdata = async()=>{
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }
            try{
                const {data} = await axios.post('/api/private/getorderhistory', { userId: user._id }, config).catch(err => {
                    console.log(err);
                    if (err.response.status === 404) {
                        throw new Error(`Product Not Found`);
                    }
                    else {
                        throw new Error(`Internal Server Error`);
                    }
                    throw err;
                });
                setOrders(data);
            }catch(err){
                console.log(err)
            }
        }
        fetchdata();
    },[user])

    return (
        <div className="orderhistory">
            <div className="orderHistoryWrapper">
                {
                    orders.map((obj, key)=>{
                        return (
                            <ItemHistoryCard value={obj}/>
                        )
                    })
                }
            </div>
        </div>
    )
}
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/appContext/AppContext'
import CartItem from '../../components/cartitem/CartItem'
import './addtocartpage.css'
import axios from 'axios'

export default function Addtocartpage() {

    const { user, dispatch } = useContext(AppContext);
    const [cartitems, setCartitems] = useState([])

    useEffect(() => {
        const getProductdata = async () => {
            /* setIsFetching(true); */
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}` 
                }
            }
            try {
                const { data } = await axios.post('/api/private/getallcartitem', { userId: user._id }, config).catch(err => {
                    if (err.response.status === 404) {
                        /*  setErrors("Product Not Found") */
                        throw new Error(`Product Not Found`);
                    }
                    else {
                        /* setErrors("Internal Server Error") */
                        throw new Error(`Internal Server Error`);
                    }
                    throw err;
                });
                setCartitems(data);
                console.log(data)
                /* setItem(data) */
                /* setIsFetching(false); */
            } catch (err) {
                console.log("Error Occured");
                /* setIsFetching(false); */
            }
        }
        getProductdata();
    }, [user])

    return (
        <div className="addtocartpage">
            <div className="addtocartpageWrapper">
                {
                    cartitems.map((item, key)=>{
                        return (
                            <CartItem value={item}/>
                        )
                    })
                }
                <div className="footer">
                    <hr></hr>
                    <b>
                    <span className="gt">Grand Total</span>
                    <span>₹{4500}/-</span>
                    </b>
                    <button className="ckButton">Check Out</button>
                </div>
            </div>
        </div>
    )
}
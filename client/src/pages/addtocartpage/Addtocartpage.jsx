import { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../context/appContext/AppContext'
import './addtocartpage.css'
import axios from 'axios'

export default function Addtocartpage() {

    const { user, dispatch } = useContext(AppContext);
    const [cartitems, setCartitems] = useState([])
    const [grossTotal, setGrosstotal] = useState(0);

    function CartItem(props) {
        const handleDecrement = (e) => {
            e.preventDefault();
            if (props.value.orderQuantity != 1) {
                for (let i = 0; i < cartitems.length; i++) {
                    if (cartitems[i]._id === props.value._id) {
                        props.value.orderQuantity -= 1;
                        props.value.totalPrice -= props.value.productPrice;
                    }
                }
                setGrosstotal(grossTotal - props.value.productPrice);
            }
        }
        const handleIncrement = (e) => {
            e.preventDefault();
            if (props.value.orderQuantity != parseInt(props.value.productQuantity)) {
                for (let i = 0; i < cartitems.length; i++) {
                    if (cartitems[i]._id === props.value._id) {
                        props.value.orderQuantity += 1;
                        props.value.totalPrice += props.value.productPrice;
                    }
                }
                setGrosstotal(grossTotal + props.value.productPrice);
            }
        }


        return (
            <div className="cartitem">
                <div className="cartitemWrapper">
                    <div className="chleft">
                        <img className="cartHeaderImg" src={props.value.productImage} alt="product image" />
                        <div className="headerText">
                            <h4>{props.value.productName}</h4>
                            <span className="ciPrice">Price: ₹{props.value.productPrice}/-</span>
                            <span className="removeCart">Remove</span>
                        </div>
                    </div>
                    <div className="secDiv">
                        <div className="chmid">
                            <div className="quanHandler">
                                <button className="idButton" onClick={handleDecrement}>-</button>
                                <span className="idTest">{props.value.orderQuantity}</span>
                                <button className="idButton" onClick={handleIncrement}>+</button>
                            </div>
                        </div>
                        <div className="chright">
                            <span className="ciPrice">₹{props.value.totalPrice}/-</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    /* export default React.memo(Child); */

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
                let dummy = 0;
                for (let i = 0; i < data.length; i++) {
                    data[i].totalPrice = data[i].productPrice;
                    data[i].orderQuantity = 1;
                    dummy = dummy + data[i].productPrice
                    setGrosstotal(dummy);
                }
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
                    cartitems.map((item, key) => {

                        return (
                            <CartItem value={item} />
                        )
                    })
                }
                <div className="footer">
                    <hr></hr>
                    <b>
                        <span className="gt">Grand Total</span>
                        <span>₹{grossTotal}/-</span>
                    </b>
                    <button className="ckButton">Check Out</button>
                </div>
            </div>
        </div>
    )
}
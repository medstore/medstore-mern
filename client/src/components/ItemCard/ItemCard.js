import React from 'react'
import './ItemCard.css'
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
 
const ItemCart = (props) => {
     
    console.log(props)
    return (
        <>
            <div className="card">
                <div className="wrapper">
                    <img src={props.img} className="card_img" alt="product image" />
                    <div className="cardInfo">
                        <h5 class="cardTitle">{props.title}</h5>
                        <p class="cardText">{props.desc}</p>
                        <p class="cardPrice">{props.price}</p>
                        <p class="cardDetails">{props.details}</p>
                        <div className="btn">
                        <Fab color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}
export default ItemCart;
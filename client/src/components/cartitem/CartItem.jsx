import './cartitem.css'

export default function CartItem(props) {

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

                    <div className="chmid">
                        <div className="quantityDiv">
                            <span>5</span>
                        </div>
                    </div>

                    <div className="chright">
                        <span className="ciPrice">₹{props.value.productPrice}/-</span>
                    </div>
            </div>
        </div>
    )
}
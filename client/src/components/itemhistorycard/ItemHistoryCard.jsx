import react from 'react'
import './itemhistorycard.css'

export default function ItemHistoryCard() {
    return (
        <div className="historyCarditem">
            <div className="historyCarditemWrapper">
                <div className="hcleft">
                    <img className="historyCardHeaderImg" src="https://m.media-amazon.com/images/I/51ye7gOYXcL._SL1100_.jpg" alt="product image" />
                    <div className="headerText">
                        <h4>Horlicks Chocolate Delight Powder 500 Gm</h4>
                        <span className="hcPrice">Price: ₹500/-</span>
                    </div>
                </div>

                <div className="hcsecDiv">
                    <div className="historyTS">
                        <span className="orderTime">Ordered on 14/10/2021 - Delivered on 14/10/2021</span>
                    </div>
                    <div className="c2">
                        <div className="sec1">
                            <div className="quanHandler">
                                <span className="itemQuan">Quantity: 2</span>
                            </div>
                        </div>
                        <div className="sec2">
                            <span className="totPrice">Total: ₹1000/-</span>
                        </div>
                        <div className="sec3">
                            <span className="statusTxt">Status: Ordered</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
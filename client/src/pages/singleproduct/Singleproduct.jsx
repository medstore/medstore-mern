import './singleproduct.css'

export default function Singleproduct(props) {
    return (
        <div className="singleproduct">
            <div className="singleproductWrapper">
                <div className="spLeft">
                    {/* {
                        `heelo ${props.match.params.productId}`
                    } */}
                    <img src="https://m.media-amazon.com/images/I/6190esdtZeL._SX342_.jpg" alt="Product Image" />
                </div>
                <div className="spRight">
                    <h2 className="spName">LAMITRA N95 mask washable and Reusable 5 Layer Special safety Anti-Bacterial Mask (Multicolour N-95 Mask without Respiratory Valve)-Pack of 30 N-95 MASK 30 Reusable, Washable Cloth Mask With Melt Blown Fabric Layer  (Multicolor, Free Size, Pack of 30)</h2>
                    <span className="spPrice">₹2500/-</span>
                    <p className="spDescription">5 layer Protective mask Universal Fit Washable and Reusable Soft Inner Layer for Comfort Soft ear loops for comfortable and Soft Grip Flat fold design for easy storage Easy to carry in pockets</p>
                    <p className="spDetails">
                        <ul>
                            <li>Brand - LAMITRA</li>
                            <li>Model - Number N-95 MASK 30</li>
                            <li>Type - Cloth Mask</li>
                            <li>Mask - Type Half Mask</li>
                            <li>Respirator Type - NA</li>
                            <li>Mounting Type - EAR</li>
                            <li>Model Name - N95 mask washable and Reusable 5 Layer Special safety Anti-Bacterial Mask (Multicolour N-95 Mask without Respiratory Valve)-Pack of 30</li>

                        </ul>
                    </p>
                    <button className="spAddtocart">Add to Cart</button>
                </div>
            </div>
        </div>
    )
}
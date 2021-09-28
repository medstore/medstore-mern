import './home.css'
import Homemap from '../../components/maps/Homemap'
import useGeoLocation from "../../components/maps/useGeoLocation";
import { useState, useEffect } from 'react';
import axios from 'axios'
import Itemdata from '../../components/ItemCard/Itemdata'
import ItemCart from '../../components/ItemCard/ItemCard'
import Product from '../addproduct/Product';
export default function Home() {
    const [userAddress, setUserAddress] = useState([]);
    const [selected, setSelected] = useState("N/A")
    const [locallowed, setLocallowed] = useState(true)
    const location = useGeoLocation();

    // console.log(Itemdata.productData)
 
    useEffect(() => {
        const getUserLocation = async () => {
            let list = [];
            if (!location.error) {
                setLocallowed(true)
                const res = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location.coordinates.lng},${location.coordinates.lat}.json?access_token=${process.env.REACT_APP_MAPBOX}`);
                const address = res.data.features;
                for (let j = 1; j < address.length; j++) {
                    let pair = { id: address[j].place_type[0], name: address[j].text };
                    list.push(pair)
                    /* list = { ...list, ...pair } */

                }
                setUserAddress(list)
            } else {
                setLocallowed(false)
            }
        }
        getUserLocation();
    }, [location.coordinates])

    const handleChange = (e) => {
        e.preventDefault();
        setSelected(e.target.value)
    }
    // console.log(Itemdata.productData);
    return (
        <div className="home">
            {
                locallowed ? null :
                    <div className="locError">
                        <span className="locErrorSpan">Please allow the location permission and refresh the page again.</span>
                    </div>
            }
            <div className="homeWrapper">
                <div className="homeLeft">
                    <div className="leftWrapper">
                        <div className="inputItem">
                            <i className="fas fa-search"></i>
                            <input className="inputProduct" placeholder="Search products here..." />
                        </div>
                        <div className="selectItem">
                            <select id="dropdown" onChange={handleChange}>
                                <option value="N/A">Select Location</option>
                                {
                                    userAddress.map((data) => {
                                        return (
                                            <option key={data.id} value={data.id} name={data.name}>{data.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <button className="searchButton" disabled={!locallowed}>Search</button>
                        </div>

                        <div className="productsDiv">
                            {
                                Itemdata.productData.map((item, index) => {
                                    return <ItemCart img={item.img} title={item.title} desc={item.desc}
                                        price={item.price}
                                        details={item.details} key={index} />
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="homeRight">
                    <Homemap />
                </div>
            </div>
        </div >
    )
}
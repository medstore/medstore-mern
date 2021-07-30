import './home.css'
import useGeoLocation from "../../components/maps/useGeoLocation";
import { useState, useEffect } from 'react';
import axios from 'axios'

export default function Home() {
    const [userAddress, setUserAddress] = useState({});
    const [selected, Setselected] = useState("N/A")
    const location = useGeoLocation();

    useEffect(() => {
        const getUserLocation = async () => {
            let list = {};
            const res = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location.coordinates.lng},${location.coordinates.lat}.json?access_token=${process.env.REACT_APP_MAPBOX}`);
            const address = res.data.features;
            for (let j = 1; j < address.length; j++) {
                /* list.push({ [address[j].place_type]: address[j].text }) */
                let pair = {[address[j].place_type]: address[j].text};
                list = {...list, ...pair}
                
            }
            setUserAddress(list)
            /* setUserAddress(list); */
        }
        getUserLocation();
    }, [location.coordinates])

    const handleChange = (e)=>{
        e.preventDefault();
        Setselected(e.target.value)
    }

    return (
        <div className="home">
            <div className="homeWrapper">
                <div className="homeLeft">
                    <div className="leftWrapper">
                        <div className="inputItem">
                            <i className="fas fa-search"></i>
                            <input className="inputProduct" placeholder="Search products here..." />
                        </div>
                        <select id="dropdown" value={selected} onChange={handleChange}>
                            <option value="N/A">Select Location</option>
                            <option value="locality">Locality</option>
                            <option value="district">District</option>
                            <option value="region">State</option>
                            <option value="country">Country</option>
                        </select>
                        <button>Search</button>
                        <p>{userAddress[selected]}</p>
                    </div>
                </div>
                <div className="homeRight">
                    {/* <Homemap /> */}
                </div>
            </div>
        </div >
    )
}
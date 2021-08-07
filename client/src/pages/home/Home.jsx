import './home.css'
import Homemap from '../../components/maps/Homemap'
import useGeoLocation from "../../components/maps/useGeoLocation";
import { useState, useEffect } from 'react';
import axios from 'axios'

export default function Home() {
    const [userAddress, setUserAddress] = useState([]);
    const [selected, setSelected] = useState("N/A")
    const [locallowed, setLocallowed] = useState(true)
    const location = useGeoLocation();

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
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit ipsam asperiores qui, eaque, autem id animi quibusdam quod suscipit accusamus ab eos sequi! Enim consectetur modi perspiciatis consequuntur similique rem blanditiis nulla illo recusandae ut et iste, deserunt, nobis ratione quae a cum impedit quia itaque commodi quam. Possimus exercitationem saepe eius accusamus odio quasi repudiandae voluptatibus tempora fuga perspiciatis magni ipsum nam quos ea maiores quisquam, asperiores dolore reiciendis laudantium similique! Culpa dolore quia corporis incidunt commodi sed nobis cupiditate quam, voluptatem consequatur, ad optio laudantium? Laudantium sed perferendis rem. Provident voluptatum minima beatae laudantium nesciunt fugiat enim nam explicabo, quia eum. Sed ipsa in, inventore fugiat est pariatur ullam illo minus recusandae repellat dolorum officiis excepturi quam nisi molestias vero dolore quibusdam eaque optio, debitis necessitatibus, cumque repellendus aut! Hic ea aliquid accusamus, alias a esse quis inventore officiis voluptas dolores fugiat beatae, ipsum adipisci totam laborum omnis veritatis? Ab obcaecati quibusdam, corrupti nesciunt deleniti debitis natus nihil fugiat velit tempore porro. Eligendi unde incidunt rerum eveniet corporis, iure fuga officiis sint architecto totam repudiandae earum voluptatibus, nam repellendus consequuntur fugiat ducimus repellat hic dignissimos voluptatum recusandae maiores? Ducimus ex, reiciendis enim accusantium voluptate, alias temporibus cupiditate debitis molestias doloribus, sed quam eaque rem quae nemo laboriosam nam! Rerum repellendus, animi ipsum architecto sequi aliquam porro quos exercitationem consequatur minima magni soluta cum laboriosam vero officiis labore magnam odio, deleniti perferendis. Temporibus nesciunt enim voluptates nisi ducimus in ea quo, porro iure facilis eius nobis deserunt deleniti perspiciatis necessitatibus quos harum nihil amet commodi maiores numquam itaque nemo sunt odit. Quisquam atque, iusto iste sed debitis eveniet obcaecati fugit itaque veritatis eos nihil odit, voluptatum vel? Fuga dolorum minima expedita magnam sequi perspiciatis quod accusantium obcaecati omnis, esse, corrupti earum laudantium, natus a est! Ratione fuga, possimus ab aspernatur iste, eaque quidem numquam ad veniam, mollitia quasi libero autem eos animi consequuntur dicta et sequi id suscipit hic iusto inventore? Nobis at dolorum sint, esse amet fuga neque accusantium, delectus laudantium dolorem quis soluta distinctio debitis dolore eos voluptatem itaque corrupti. Repudiandae optio nesciunt consequuntur laboriosam dolore nisi illum aperiam tempore nulla voluptatibus mollitia iure, error alias ullam at. Neque laborum rerum possimus repudiandae minus beatae, aliquid quas esse, omnis dicta odit architecto voluptates commodi. Animi, officiis! Sunt officia sequi, explicabo voluptatibus velit exercitationem obcaecati eligendi eum ducimus sed dignissimos ab soluta voluptas necessitatibus quas, hic beatae pariatur sint saepe, error veritatis maiores. Nesciunt eaque, saepe laudantium, voluptate excepturi exercitationem unde beatae quia, nihil vel ab tenetur illum? Totam reprehenderit dolor hic, reiciendis quas molestiae possimus commodi accusantium, architecto necessitatibus obcaecati quos facilis numquam doloremque amet, odit dicta minima expedita quis repudiandae quibusdam consectetur debitis corrupti atque! Nostrum cupiditate recusandae nisi fuga expedita nobis vitae et perspiciatis maiores fugiat sequi molestiae, non dolore? Mollitia pariatur dolores quia aperiam rerum, recusandae optio iusto minus temporibus ipsam excepturi adipisci laboriosam voluptatum at rem ullam perspiciatis ipsum perferendis eius assumenda. Illum ex libero ratione quibusdam maxime aliquid iure sunt exercitationem nulla.</p>
                    </div>
                </div>
                <div className="homeRight">
                    <Homemap />
                </div>
            </div>
        </div >
    )
}
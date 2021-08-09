import './profile.css'
import emptyprofile from '../../images/emptyprofile.png'
import { useState } from 'react'
import Editdetailform from '../../components/form/Editdetailform'

export default function Profile() {
    const [userDetail, setUserDetail] = useState({firstName: " Sushil Kumar", lastName:"Gupta", email:"abcd@gmail.com", delAddress:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt quis consectetur temporibus"})

    return (
        <div className="profile">
            <div className="profileWrapper">
                <h1 className="profileHeading">Profile</h1>
                <div className="profileImgDiv"><img className="profileImg" src={emptyprofile} /></div>
                <Editdetailform signal={true} />
                <div className="pInfo">
                    <h2>Personal Infomation</h2>
                    <p>First Name: {userDetail.firstName}</p>
                    <p>Last Name: {userDetail.lastName}</p>
                </div>

                <div className="pInfo">
                    <h2>Email</h2>
                    <p>Email: {userDetail.email}</p>
                </div>

                <div className="pInfo">
                    <h2>Address</h2>
                    <p>Delivery Address: {userDetail.delAddress}</p>
                </div>
            </div>
        </div>
    )
}


import { NavLink,Link } from 'react-router-dom';
//import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import emptyprofile from "../../images/emptyprofile.png"
import { AppContext } from '../../context/appContext/AppContext';
import { CircularProgress, List } from '@material-ui/core'

import "./dashboard.css"
import React from 'react';

export default function dashboard() {

  //  const { authenticated, user, dispatch } = useContext(AppContext);

   // const history = useHistory();
    return (
        <div className="Dashboard">
        <div className="menu-item">
            
           
            <a  href ="#">Product</a>
            <br/>
            <a href ="#">Shipping status </a>
            <br/>
            <a href="#">Purchase </a>
            <br/>

            <a href="#">order detail</a>
        
            </div>



<div  className="main">
  hiiiiiiiiii
</div>

        

        
        </div>
    )
}

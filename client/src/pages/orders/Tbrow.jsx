import React, { useContext, useEffect, useState, } from 'react'
import './orders.css'
import { useHistory } from 'react-router';
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { CircularProgress } from '@material-ui/core';


export default function Tbrow(props) {

    const [isFetching, setIsFetching] = useState(false);
    const [status, setStatus] = useState(props.value.status);

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    return (
        <TableRow>
            <TableCell align="left">{props.value.orderId}</TableCell>

            <TableCell align="left">{props.value.customerName}</TableCell>

            <TableCell align="left">
                {props.value.quantity}
            </TableCell>
            <TableCell>
                <label><b>Name : &nbsp; </b><p align="left">{props.value.productName}</p></label>
                <label><b>Price : &nbsp; </b><span align="left">₹{props.value.totalPrice}/-</span></label>

            </TableCell>
            {/* {product.map(item => {
                  return order.productId === item._id ?  : ""

                })} */}



            <TableCell align="left">

                <FormControl variant="outlined" halfWidth>
                    <InputLabel>status</InputLabel>
                    <Select
                        value={status}
                        label="status"
                        onChange={handleChange}
                    >
                        <MenuItem value="Ordered">Ordered</MenuItem>
                        <MenuItem value="Inprocess">Inprocess</MenuItem>
                        <MenuItem value="Delivered">Delivered</MenuItem>
                    </Select>
                </FormControl>

            </TableCell>
            <TableCell>
                <button type="submit" className="statusButton" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="20px" /> : "Update Status"}</button>
            </TableCell>
        </TableRow>
    )
}
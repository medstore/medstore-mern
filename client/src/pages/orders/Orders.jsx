import React ,{ useContext,useEffect, useState , } from 'react'
import './orders.css'
import { useHistory } from 'react-router';
import axios from "axios";
import { AppContext } from '../../context/appContext/AppContext';
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
const Orders = () => {


    const { user } = useContext(AppContext);
    const [errors, setErrors] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const history = useHistory();
    const [order, setOrder] = useState([{ ownerId: "", storeId: "", productId:"", status: "", quantity: ""}])
    const [product, setProduct] = useState([{ productName: "abcdd", productDescription: "", productImage:"", productPrice: "", productDetails: ""}])
    const [status, setStatus] = useState('');
    const [users, setUsers] = useState({ firstname: "", lastname: ""})
  const handleChange = (event) => {
    setStatus(event.target.value);
  };
    useEffect(() => {   
     
      
        if(user) 
        {
            const orderData = async () => {
             
            setIsFetching(true)
            setErrors(false);
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }
       
            // console.log(user.storeId)
            try {
                const { data } = await axios.post(`/api/private/storedashboard/orders`, {storeId : user.storeId ,ownerId : user._id} , config).catch(err => {
                    if (err.response.status === 409) {
                        setErrors("Invalid User")
                        throw new Error(`Invalid User`);
                    }  
                    else {
                        setErrors("Internal Server Error")
                        throw new Error(`Internal Server Error`);
                    }
                    throw err;
                }); 
                setOrder(data.orders)
                setProduct(data.products)
                setUsers(data.users)
                setIsFetching(false);
                 
            } catch (err) {
                 
                setErrors(err.message)
            }
        }
        orderData()
        }
       
  },[user])

  
    return (
        <div>
        <div className="heading">
        <h1>All Order Store  Page </h1>
        </div>
        {errors ?
            <div className="errorDiv">
            <span className="errorMessage">{errors}</span>
            </div> : null}

        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="left">Quantity</TableCell>
            <TableCell align="left">Product</TableCell>
            <TableCell align="left">Status</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {order.map((order) => (

            <TableRow>
              
             <TableCell align="left">{users.firstname}</TableCell> <TableCell align="left">{users.lastname}</TableCell> 
                
              <TableCell align="left">
                {order.quantity}
              </TableCell>
              {product.map((item) => (
                <TableRow>
                <label> <b>Name: </b> &nbsp; <TableCell align="left">{item.productName}</TableCell></label>  
                <label> <b>Price : </b> &nbsp;<TableCell align="left">{item.productPrice}</TableCell></label>
                <hr></hr>
                
                </TableRow>
                

                ))}
                 
                <TableCell align="left">
                 
                <FormControl variant="outlined" halfWidth>
                <InputLabel>status</InputLabel>
                <Select
                 
                value={status}
                label="status"
                onChange={handleChange}
                >
                <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                <MenuItem value="Inprocess">Inprocess</MenuItem>
                <MenuItem value="Delivered">Delivered</MenuItem>
                 
                </Select>
           </FormControl>
                         
                </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>   
             
                {/* {
                order.map((order, index) => {
                    
                return  <div className="storeregContainer">
                
                <div className="storeregWrapper">
                <div className="storeregRight" >
                    <div className="storeregBox">
                        
                            {errors ?
                            <div className="errorDiv">
                                <span className="errorMessage">{errors}</span>
                            </div> : null}
                         <div>
                         <p>{order.status}</p>
                         <p>{order.quantity}</p>
                         {product.map((item, index) => {
                            return  <div >
                
                <div >
                <div >
                    <div >
                        
                            {errors ?
                            <div className="errorDiv">
                                <span className="errorMessage">{errors}</span>
                            </div> : null}
                         <div>
                         <h2>{item.productName}</h2>
                          
                         <p>{item.productPrice}</p>
                          
                         </div>

                    </div>
                </div>
             </div>
        </div>
                })
                }
                         </div>

                    </div>
                </div>
             </div>
        </div>
                })
                } */}
                 
        </div>
    )
}

export default Orders;



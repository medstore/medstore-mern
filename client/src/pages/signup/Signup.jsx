import React, { Component } from 'react'
import css from './Signup.css';
class Signup extends Component{

    constructor(props){
        super(props)
        this.state={
            firstName:'',
            lastName:'',
            emailId:'',
            Password:'',
            Password2:''
        }

        this.changeFirstName=this.changeFirstName.bind(this);
        this.changeLastName=this.changeLastName.bind(this);
        this.changeEmailId=this.changeEmailId.bind(this);
        this.changePassword=this.changePassword.bind(this);
        this.changePassword2=this.changePassword2.bind(this);
        this.saveinfo=this.saveinfo.bind(this);
    }

    changeFirstName=(event)=>{
        this.setState({firstName: event.target.value});
    }

    changeLastName=(event)=>{
        this.setState({lastName: event.target.value});
    }

    changeEmailId=(event)=>{
        this.setState({emailId: event.target.value});
    }

    changePassword=(event)=>{
        this.setState({Password: event.target.value});
    }
    changePassword2=(event)=>{
        this.setState({Password2: event.target.value});
    }

    saveinfo=(e)=>{
        e.preventDefault();
        let userinfo ={firstName: this.state.firstName,lastName: this.state.lastName,
            emailId: this.state.emailId,password: this.state.Password,Password2:this.state.Password2};
      console.log('user=>'+JSON.stringify(userinfo));
    }
    

       
    cancel(){
        this.props.history.push();
    }

    render(){
        return(
            <div>

            <div className="container">
                <div className="row">
                    <br></br>
                    <h1 className="text-center"> Registration Form</h1>
                    <br></br>
                    <div className="register ">
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>First Name:</label>
                                    <input placeholder="First Name" name="firstName" className="form-control"
                                    value={this.state.firstName} onChange={this.changeFirstName}/>
                                </div>
                                <div className="form-group">
                                    <label>Last Name:</label>
                                    <input placeholder="Last Name" name="lastName" className="form-control"
                                    value={this.state.lastName} onChange={this.changeLastName}/>
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input placeholder="Email" name="emailId" className="form-control"
                                    value={this.state.emailId} onChange={this.changeEmailId}/>
                                </div>
                                
                                <div className="form-group">
                                    <label>Password </label>
                                    <input placeholder="Password" name="Password" className="form-control"
                                    value={this.state.address} onChange={this.changePassword}/>
                                </div>
                                <div className="form-group">
                                    <label>Confirm Password </label>
                                    <input placeholder="Password" name="Password2" className="form-control"
                                    value={this.state.Password2} onChange={this.changePassword2}/>
                                </div>

                                <br></br>
                                <br></br>
                                <button className="register" onClick={this.saveinfo}>Register </button>
                                <button className="btn btn-danger" onClick={this.cancel.bind} style={{marginLeft:"10px"}}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Signup
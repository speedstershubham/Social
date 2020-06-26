import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {signin,authenticate} from '../auth';

export class Signin extends Component {
    constructor() {
        super();
    
        this.state = {
             email:"",
             password:"",
             error:"",
             redirectToreferer:false,
             Loading: false
        };
    }

handleChange = name => event => {
    this.setState({error: ""})
    this.setState({ [name] : event.target.value });
};


clickSubmit = event => {
event.preventDefault();
this.setState({Loading:true})
const {email,password} = this.state
const user = {
    email,
    password
};
//console.log(user);
signin(user)
.then(data => {
if(data.error) {
    this.setState({error:data.error, Loading:false})
} else{
//authenticate

authenticate(data,() => {
    this.setState({redirectToreferer:true})
} )
//redirect
} 

});
};

signinForm = (email,password) =>(
    <form>
   
        <div className="form-group">
      <label className="text-muted">Email</label>
      <input onChange={this.handleChange("email")} type="email" value={email} className="form-control"/>
        </div> 
        <div className="form-group">
      <label className="text-muted">Password</label>
      <input onChange={this.handleChange("password")} type="password" value={password} className="form-control"/>
        </div> 
        <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
    </form>
)

    render() {
        const {email,password,error,redirectToreferer,Loading} = this.state
       
        if(redirectToreferer){
            return <Redirect to="/" />
        }
       
       
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signin</h2>

<div className="alert alert-primary"  style={{display:error ? "":"none"}}>
{error}

</div>

{ Loading ? (
    <div className="jumbotron text-center">
    <h2>Loading...</h2>
    </div>
): ( "")}

{this.signinForm(email,password)}
               
            </div>
        );
    }
}

export default Signin

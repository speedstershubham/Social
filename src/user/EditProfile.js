import React, { Component } from 'react'
import {isAuthenticated} from '../auth'
import {read,update,updateUser} from "./apiUser";
import {Redirect} from 'react-router-dom'
import DefaultProfile from "../images/avatar.png";

class EditProfile extends Component {

constructor() {
    super()

    this.state = {
         id:"",
         name:"",
         password:"",
         email:"",
         redirectToProfile:false,
         error:"",
         fileSize:0,
         loading:false,
         about:""
    };
}

handleChange = name => event => {

    this.setState({error:""});
    const value = 
    name ==='photo' ? event.target.files[0] :event.target.value
  
    const fileSize =  name ==='photo' ? event.target.files[0].size :0;
    this.userData.set(name,value)
    this.setState({ [name] : value, fileSize });
};

clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
        const userId = this.props.match.params.userId;
        const token = isAuthenticated().token;

        update(userId, token, this.userData).then(data => {
            if (data.error) {
                this.setState({ error: data.error });
                // if admin only redirect
            } else if (isAuthenticated().user.role === "admin") {
                this.setState({
                    redirectToProfile: true
                });
            } else {
                // if same user update localstorage and redirect
                updateUser(data, () => {
                    this.setState({
                        redirectToProfile: true
                    });
                });
            }
        });
    }
};


clickSubmit = event => {
event.preventDefault()
this.setState({loading:true})

if(this.isValid()){
const {name,email,password} = this.state;
const user = {
    name,
    email,
    password: password || undefined
};
//console.log(user);
const userId = this.props.match.params.userId;
const token = isAuthenticated().token;
update(userId,token,this.userData)
.then(data => {
 console.log({data})
if(data.error){ this.setState({error: data.error});
}else 
updateUser(data, () => {
    this.setState({
        redirectToProfile:true
     });
});
});
}
};

    init = userId =>{
        const token = isAuthenticated().token;
           read(userId,token)
            .then(data => {
                if(data.error){
                  this.setState({redirectToProfile:true})
                }else{
                    this.setState({id: data._id,name:data.name,email:data.email,error:'',about:data.about});
                }
            });
        };
        
        
             componentDidMount(){
                 this.userData = new FormData()
        const userId = this.props.match.params.userId;
        this.init(userId);
             }
             
             
             isValid = () => {
                 const{name,email,password,fileSize} = this.state

                 if(fileSize> 100000)
                 {
                     this.setState({ error:"file size should be less than 100kb"})
                     return false;
                 }
                 if(name.length == 0)
                 {
                     this.setState({ error:"Name is required"})
                     return false
                 }
                 if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
                 {
                     this.setState({ error:"A valid email is required"})
                     return false
                 }
                 if(password.length >= 1 && password.length <=5)
                 {
                     this.setState({ error:"Password must be at least 6 char"});
                     return false
                 }
                 return true;

             };

             signupForm = (name,email,password,about) =>(
                <form>
      
      <div className="form-group">
                  <label className="text-muted">Profile Photo</label>
                  <input onChange={this.handleChange("photo")} type="file" accept="image/*" className="form-control"/>
                    </div> 

                <div className="form-group">
                  <label className="text-muted">Name</label>
                  <input onChange={this.handleChange("name")} type="text"  value={name} className="form-control"/>
                    </div> 
                    <div className="form-group">
                  <label className="text-muted">Email</label>
                  <input onChange={this.handleChange("email")} type="email" value={email} className="form-control"/>
                    </div> 
                    <div className="form-group">
                  <label className="text-muted">About</label>
                  <textarea onChange={this.handleChange("about")} type="text"  value={about} className="form-control"/>
                    </div> 
                    <div className="form-group">
                  <label className="text-muted">Password</label>
                  <input onChange={this.handleChange("password")} type="password" value={password} className="form-control"/>
                    </div> 
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Update Profile</button>
                </form>
            )

    render() {
        const { id, name,email,password,redirectToProfile,error,Loading,about} = this.state;

        if(redirectToProfile){
           return <Redirect to={`/user/${id}`} />;
        }

       const photoUrl = id ? `http://localhost:8000/user/photo/${id}?${new Date().getTime()}` :
DefaultProfile;
        return (
            
            <div className="container">
                <h2 className="mt-5 mb-5"> Edit Profile</h2>

                <div className="alert alert-primary"  style={{display:error ? "":"none"}}>
{error}

</div>
{ Loading ? (
    <div className="jumbotron text-center">
    <h2>Loading...</h2>
    </div>
): ( "")}

<img style={{height:"200px",width:"200px"}} className="img-thumbnail" src={photoUrl}  onError={i =>(i.target.src = `${DefaultProfile}`)} />

                {this.signupForm(name,email,password,about)}
            </div>
        )
    }
}

export default EditProfile

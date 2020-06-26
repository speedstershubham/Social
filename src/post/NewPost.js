import React, { Component } from 'react'
import {isAuthenticated} from '../auth'
import { create } from "./apiPost";
import {Redirect} from 'react-router-dom'
import DefaultProfile from "../images/avatar.png";

class NewPost extends Component {

constructor() {
    super()

    this.state = {
        ttle:'',
        body:'',
        photo:'',
        error:'',
        user:{},
        fileSize:0,
        Loading:false
    };
}

handleChange = name => event => {

    this.setState({error:""});
    const value = 
    name ==="photo" ? event.target.files[0] :event.target.value;
  
    const fileSize =  name ==='photo' ? event.target.files[0].size :0;
    this.postData.set(name,value)
    this.setState({ [name] : value, fileSize });
};

clickSubmit = event => {
event.preventDefault()
this.setState({Loading:true})

if(this.isValid()){
const {name,email,password} = this.state;
const user = {
    name,
    email,
    password: password || undefined
};
//console.log(user);
const userId = isAuthenticated().user._id;
const token = isAuthenticated().token;
create(userId,token,this.postData)
.then(data => {
 console.log({data})
if(data.error){ this.setState({error: data.error});
}else 
this.setState({
    Loading: false,
     title:"",
     body:"",
     photo:""
    });
});

}
};

    
        
             componentDidMount(){
                 this.postData = new FormData();
      this.setState({user: isAuthenticated().user})
             }
             
             
             isValid = () => {
                 const{title,body,fileSize} = this.state

                 if(fileSize> 100000)
                 {
                     this.setState({ error:"file size should be less than 100kb"})
                     return false;
                 }
                 if(title.length == 0 || body.length === 0)
                 {
                     this.setState({ error:"All fields are required",Loading: false});
                     return false;
                 }
               
                 
                 return true;

             };

             newPostForm = (title,body) =>(
                <form>
      
      <div className="form-group">
                  <label className="text-muted">Profile Photo</label>
                  <input onChange={this.handleChange("photo")} type="file" accept="image/*" className="form-control"/>
                    </div> 

                <div className="form-group">
                  <label className="text-muted">title</label>
                  <input onChange={this.handleChange("title")} type="text"  value={title} className="form-control"/>
                    </div> 
                  
                    <div className="form-group">
                  <label className="text-muted">Body</label>
                  <textarea onChange={this.handleChange("body")} type="text"  value={body} className="form-control"/>
                    </div> 
                   
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Create Post</button>
                </form>
            )
 
    render() {
        const { title, body, user,photo,error,Loading,redirectToProfile} = this.state;

        if(redirectToProfile){
          return <Redirect to={`/user/${user._id}`} />;
        }

      // const photoUrl = id ? `http://localhost:8000/user/photo/${id}?${new Date().getTime()}` :
//DefaultProfile;
        return (
            
            <div className="c ontainer">
                <h2 className="mt-5 mb-5"> Create a new Post</h2>

                <div className="alert alert-primary"  style={{display:error ? "":"none"}}>
{error}

</div>
{ Loading ? (
    <div className="jumbotron text-center">
    <h2>Loading...</h2>
    </div>
): ( "")}
{/*<img style={{height:"200px",width:"200px"}} className="img-thumbnail" src={photoUrl}  onError={i =>(i.target.src = `${DefaultProfile}`)} />*/}

                {this.newPostForm(title,body)}
            </div>
        )
    }
}

export default NewPost

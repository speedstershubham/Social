import React, { Component } from 'react'
import {singlePost , update} from './apiPost'
import {isAuthenticated} from '../auth'
import {Redirect} from 'react-router-dom'
import DefaultPost from "../images/avengers.jpg";


class EditPost extends Component {
    constructor() {
        super()
    
        this.state = {
             id:'',
             title:'',
             body:'',
             redirectToProfile:false,
             error:'',
             fileSize:0,
             Loading:false
        }
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
    event.preventDefault();
    this.setState({Loading: true});
    if(this.isValid()){
    const postId = this.state.id
    const token = isAuthenticated().token;
    update(postId,token,this.postData)
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


    editPostForm = (title,body) =>(
        <form>

<div className="form-group">
          <label className="text-muted">Post Photo</label>
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
           
            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">update Post</button>
        </form>
    )

    
    init = postId => {
        singlePost(postId)
            .then(data => {
                if(data.error){
                  this.setState({redirectToProfile: true})
                }else{
                    this.setState({id: data._id,title:data.title,body:data.body,error:''});
                }
            });
        };
        
        
             componentDidMount(){
                 this.postData = new FormData()
        const postId = this.props.match.params.postId;
        this.init(postId);
             }

    render() {

        const { id, title , body ,redirectToProfile, error , Loading } = this.state;
        
        if(redirectToProfile){
            return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
          }
  
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">{title}</h2>


                <div className="alert alert-primary"  style={{display:error ? "":"none"}}>
{error}

</div>
{ Loading ? (
    <div className="jumbotron text-center">
    <h2>Loading...</h2>
    </div>
): ( "")}

                <img style={{height:"200px",width:"200px"}} className="img-thumbnail" src={`https://mern-insta-acc.herokuapp.com/post/photo/${id}`}  onError={i =>(i.target.src = `${DefaultPost}`)} />
              {this. editPostForm(title, body)}
            </div>
        )
    }
}

export default EditPost

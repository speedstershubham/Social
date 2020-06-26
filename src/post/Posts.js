import React, { Component } from 'react'
import{list} from './apiPost';
import{Link} from 'react-router-dom';
import DefaultPost from'../images/avengers.jpg'

 class Posts extends Component {
     constructor() {
         super(); 
         this.state = {
              posts:[]
         };
     }
     
componentDidMount() {
    list().then(data => {
        console.log({data})
        if (data.error){ 
            console.log(data.error);
        }else{
            this.setState({posts:data});
        }
    });
}


renderPosts = posts => {
    return (
        <div className="row">
        {posts.map((post,i) => {

const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "admin"
const posterName = post.postedBy ? post.postedBy.name :  " unKnown";

        return(
            <div className="card col-md-4"  key={i}>
            <div className="card-body">
                <img 
                src={`https://mern-insta-acc.herokuapp.com/post/photo/${post._id}`}
onError={i => i.target.src = `${DefaultPost}`}
className="img-thimnail mb-3"
alt={post.title}
style={{ height:'200px',width: "auto"}}
/>
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.body.substring(0 ,100)}</p>
              <br />
              <p className="font-italic mark">
                  posted By<Link to={`${posterId}`}>  {posterName}</Link>
  on{new Date(post.created).toDateString()}

              </p>
               <Link 
               to={`/post/${post._id}` }
               className="btn btn-raised  btn-primary btn-sm">
                  Read More
              </Link>
            </div> 
          </div>
        )
        
})}
            
           </div>
    )
}

    render() {
        const { posts } = this.state;
        return (
            <div>
               <h2 className="mt-5 mb-5">
                   {!posts.length ? "Loading..." : "Recent Posts" }
                   </h2>
   
   {this.renderPosts(posts)}
            </div>
        )
    }
}

export default Posts;

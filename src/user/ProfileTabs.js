import React, { Component } from 'react';
import{Link} from 'react-router-dom'
import DefaultProfile from'../images/avatar.png'
import Posts from '../post/Posts';


class ProfileTabs extends Component {

   
    render() {

        const { following, followers ,posts} = this.props;
        return (
            <div>
               <div className="row">
                   <div className="col-md-4">
                       <h3 className="text-primary">Followers {followers.length}</h3>
                       <hr />
                       
                       {followers.map((person, i ) => 
                    
                        (
                         <div Key={i} >
                              
                                   <div>
                                  <Link to={`/user/${person._id}`}>
                                        <img  style={{ borderRadius: "50%" ,border:"1px solid black" }}
                                         className="foat-left mr-2" height="30px" width="30px"
                                        onError={i =>(i.target.src = `${DefaultProfile}`)}   
                                   src={`https://mern-insta-acc.herokuapp.com/user/photo/${person._id}`} alt={person.name} /> 
                               <div>
                                   <p className="lead">{person.name}</p>
                               </div>
                               
                                 </Link>
                                
                                       </div>
                                   
                                   </div>
                         )
                       )}
                   </div>

                   <div className="col-md-4">
                       <h3 className="text-primary">Following  {following.length}</h3>
                       <hr />
                       {following.map((person, i ) => 
                        (
                         <div Key={i} >
                               
                                   <div>
                                  <Link to={`/user/${person._id}`}>
                                        <img style={{ borderRadius: "50%" ,border:"1px solid black" }}
                                         className="foat-left mr-2" height="30px" width="30px"
                                        onError={i =>(i.target.src = `${DefaultProfile}`)}   
                                   src={`https://mern-insta-acc.herokuapp.com/user/photo/${person._id}`} alt={person.name} /> 
                               <div>
                                   <p className="lead">{person.name}</p>
                               </div>
                               
                                 </Link>
                               
                                       </div>
                                   
                                   </div>
                         )
                       )}
                   </div>


<div className="col-md-4">
 <h3 className="text-primary">Posts {posts.length}</h3>
 <hr /> 
 
 {posts.map((post, i ) => 
                        (


                            
                         <div Key={i} >
                               
                                   <div>
                                  <Link to={`/post/${post._id}`}>
                                       
                               <div>
                                   <p className="lead">{post.title}</p>
                               </div>
                               
                                 </Link>
                               
                                       </div>
                                   
                                   </div>
                         )
                       )}

</div>

               </div>


            </div>
        );
    }
}

export default ProfileTabs

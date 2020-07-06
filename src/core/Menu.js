import React from 'react'
import {Link ,withRouter} from 'react-router-dom'
import{signout,isAuthenticated} from '../auth'

const isActive = (history,path) => {
    if(history.location.pathname ===path) return {color: "#ff9900"}
else return {color:"#ffffff"};
};



const Menu = ({history}) => (
    <div>
        <ul className="nav nav-tabs navbar-right bg-primary  ">
    <li className="nav-item"> <Link className="nav-link" style={isActive(history,"/")} to="/" > Home</Link></li>
    <li className="nav-item"> <Link className="nav-link" style={isActive(history,"/users")} to="/users" > Friends</Link></li>
  {!isAuthenticated() && (
      <>
       <li className="nav-item">
       <Link className="nav-link" style={isActive(history,"/signin")} to="/signin"> SignIn</Link></li>
       <li className="nav-item"><Link className="nav-link" style={isActive(history,"/signup")} to="/signup"> SignUp</Link></li>
       </>
 )} 

{isAuthenticated() && (
    <>
 
 <li className="nav-item"><a className="nav-link" >
     <Link to={`/findpeople`} style={isActive(history,`/findpeople`)}>
Find People</Link></a></li>

<li className="nav-item"><a className="nav-link" >
     <Link to={`/post/create`} style={isActive(history,`/post/create`)}>
Create Post</Link></a></li>



 <li className="nav-item"><a className="nav-link" >
     <Link to={`/user/${isAuthenticated().user._id}`} style={isActive(history,`/user/${isAuthenticated().user._id}`)}>
{ `${isAuthenticated().user.name}'s Profile `} </Link></a></li>

<li className="nav-item"><span className="nav-link" style={isActive(history,"/signup"),
 {cursor:"pointer",color:"#fff"}}
 onClick={() => signout(() => history.push('/'))}
 > SignOut</span></li>

</>
)}
{isAuthenticated() &&  isAuthenticated().user.role === "admin" && (
    <>
    <li className="nav-item">
       <Link
            to={`/admin`}
            style={isActive(history, `/admin`)}
            className="nav-link"
        > Admin</Link>
           
        </li>
   </> )}
</ul>
    </div>
)
export default withRouter(Menu);


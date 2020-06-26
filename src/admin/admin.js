import React, { Component } from 'react'
import Posts from "../post/Posts";
import Users from "../user/Users";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";

class admin extends Component {
    state = {
        redirectToHome: false
    };


    componentDidMount() {
        if (isAuthenticated().user.role !== "admin") {
            this.setState({ redirectToHome: true });
        }
    }
    

    render() {
        if (this.state.redirectToHome) {
            return <Redirect to="/" />
        }

        return (
            <div>
                <div className="jumbotron">
                    <h2>Admin Dashboard</h2>
                   <p className="lead">Welcome to React Frontend </p>
                   </div>
                <div className="container col-md"></div>
                    <div className="row"></div>
                        <div className="col-md-6">
                          
    <hr />
    <Posts />

                        </div>
                        <div className="col-md-6">
                        
                            <hr/>
                            <div className="col-md-6">
  
    <hr />
    <Users />
</div>

                            </div>
                            </div>
            
        )
    }
}

export default admin

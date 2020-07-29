import React, { Component } from 'react'
import{list} from './apiUser';
import{Link} from 'react-router-dom';
import ReactSearchBox from 'react-search-box'
import DefaultProfile from'../images/avatar.png'

 class Users extends Component {
     constructor() {
         super(); 
         this.state = {
            query: "",
            filteredData: [],
              users:[]
         };
     }
     
     handleInputChange = event => {
        const query = event.target.value;
    
        this.setState(prevState => {
          const filteredData = prevState.data.filter(element => {
            return element.name.toLowerCase().includes(query.toLowerCase());
          });
    
          return {
            query,
            filteredData
          };
        });
      };

      getData = () => {
        fetch(`https://mern-insta-acc.herokuapp.com/user`)
          .then(response => response.json())
          .then(data => {
            const { query } = this.state;
            const filteredData = data.filter(element => {
              return element.name.toLowerCase().includes(query.toLowerCase());
            });
    
            this.setState({
              data,
              filteredData
            });
          });
      };
    
      componentWillMount() {
        this.getData();
      }
    

componentDidMount() {
    list().then(data => {
        if(data.error){ 
            console.log(data.error);
        }else{
            this.setState({users:data});
        }
    });
}

renderUsers = users  => (
    <div className="row">
{users.map((user,i) => (
    <div className="card col-md-4"  key={i}>
  <img style={{height:"200px",width:"200px"}} className="img-thumbnail" src={`https://mern-insta-acc.herokuapp.com/user/photo/${user._id}`}
  onError={i =>(i.target.src = `${DefaultProfile}`)}
  alt={user.name} />
  <div className="card-body">
    <h5 className="card-title">{user.name}</h5>
    
     <Link 
     to={`/user/${user._id}`}
     className="btn btn-raised  btn-primary btn-sm">
        View Profile
    </Link>
  </div> 
</div>
))}
    
   </div>
)
    render() {
        
        const {users } = this.state;
        return (
            <div >
                <h2 className="mt-5 mb-5">Friends {users.length}</h2>
                 <form>
          <input
            placeholder="Search for..."
            value={this.state.query}
            onChange={this.handleInputChange}
          />
        </form>
        <div className="row">{this.state.filteredData.map(i =><div className="card col-md-4"><img style={{height:"200px",width:"200px"}} className="img-thumbnail" src={`https://mern-insta-acc.herokuapp.com/user/photo/${i._id}`}
  onError={i =>(i.target.src = `${DefaultProfile}`)}
  alt={i.name} />
  <div className="card-body">
    <h5 className="card-title">{i.name}</h5>
    
     <Link 
     to={`/user/${i._id}`}
     className="btn btn-raised  btn-primary btn-sm">
        View Profile
    </Link>
  </div> </div> )}</div>
               
   
  
            </div>
        )
    }
}

export default Users

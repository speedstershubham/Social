export const read = (userId,token) => {
    return   fetch(`https://mern-insta-acc.herokuapp.com/user/${userId}`,{
          method:"GET",
          headers:{
              Accept:"application/json",
              "Content-Type":"application/json",
              Authorization: `Bearer ${token}`
          }
      })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

  export const list = (users) => {
    return   fetch(`https://mern-insta-acc.herokuapp.com/user`,{
        method:"GET",
      
     
    })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
  }

  export const remove = (userId,token) => {
    return   fetch(`https://mern-insta-acc.herokuapp.com/user/${userId}`,{
          method:"DELETE",
          headers:{
              Accept:"application/json",
              "Content-Type":"application/json",
              Authorization: `Bearer ${token}`
          }
      })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

  export const update = (userId,token,user) => {
    console.log("USER DATA UPDATE:", user);
    return  fetch(`https://mern-insta-acc.herokuapp.com/user/${userId}`,{
          method:"PUT",
          headers:{
              Accept:"application/json",
              Authorization: `Bearer ${token}`
          },
          body: user
      })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

  export const updateUser =(user,next) => {
    if(typeof window  !== 'undefined'){
      if(localStorage.getItem('jwt')){
        let auth = JSON.parse(localStorage.getItem('jwt'))
auth.user = user
localStorage.setItem("jwt",JSON.stringify(auth));
next()
      }
    }
  };

  export const follow = (userId, token , followId) => {
  
    return  fetch(`https://mern-insta-acc.herokuapp.com/user/follow`,{
          method:"PUT",
          headers:{
              Accept:"application/json",
              "Content-Type":"application/json",
              Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ userId, followId })
      })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

  export const unfollow = (userId, token , unfollowId) => {
  
    return  fetch(`https://mern-insta-acc.herokuapp.com/user/unfollow`,{
          method:"PUT",
          headers:{
              Accept:"application/json",
              "Content-Type":"application/json",
              Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ userId, unfollowId })
      })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };



  export const findPeople = (userId, token) => {
  
    return  fetch(`https://mern-insta-acc.herokuapp.com/user/findpeople/${userId}`, {
          method:"GET",
          headers:{
              Accept:"application/json",
              "Content-Type":"application/json",
              Authorization: `Bearer ${token}`
          },
         
      })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  
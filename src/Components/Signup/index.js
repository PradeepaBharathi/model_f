import React, { useEffect } from 'react'
import { useState } from "react";
import { addUser } from '../../Services/APIservices.js';
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../Context/context";


function Signup() {
  const {setIsLogged, setCurrentUser} = useGlobalContext();
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate();
  
  const addUserDB = async(payload) => {
      const response = await addUser(payload);
      return response; 
  }
  
  function handleClick(e){
      navigate('/login');
  }
  function handleSubmit(e){
      e.preventDefault(); 
      const response = addUserDB({fname: fname, lname: lname, email: email, password: pwd})
      response
      .then((res) => {
          if(res.status === 200 || res.status === 201){
              console.log( res.data); 
              window.alert(`User account created for : ${ res.data.data}`)
              setSuccess(true);
              setError(false);
              navigate('/sent');
          }
      })
      .catch((err) => {
          setError(true)
          setSuccess(false)
          console.log(err.response.data.message);
          window.alert(`User account not created : ${ err.response.data.message}`)
      })
   
  }
  
  useEffect( ()=> {
        localStorage.removeItem("tokenAuth");
        localStorage.removeItem("loggedUser");
        localStorage.removeItem("loggedUsername");
        localStorage.removeItem("loggedUserID");
        setIsLogged(false);
        setCurrentUser({})
  },[])

  return (
    <>
    <div className="d-flex justify-content-end align-items-end mt-3"> 
       <button className="btn btn-info m-3" onClick={handleClick}>Log in</button>
   </div>
   <div className="container m-3 ">
   <div className="d-flex justify-content-center align-items-center flex-lg-row">
   <div className=" border border-dark rounded bg-white p-5 mt-3 col-lg-6">
       <h5 className="text-decoration-underline mb-3"> Sign up </h5> 
       <form onSubmit={handleSubmit}>
           <div className="my-3">
           <label>
               Enter email:
           </label>
           <br></br>
           <input type="email" onChange={(e) => setEmail(e.target.value)} required></input>
           </div>
           <div className="my-3">
           <label>
               Enter First Name:
           </label>
           <br></br>
           <input type="text" onChange={(e) => setFname(e.target.value)} required></input>
           </div>
           <div className="my-3">
           <label>
               Enter Last Name:
           </label>
           <br></br>
           <input type="text" onChange={(e) => setLname(e.target.value)} required></input>
           </div>
           <div className="my-2">
           <label>
               Enter Password:
           </label>
           <br></br>
           <input type="password" onChange={(e) => setPwd(e.target.value)} required></input>
           </div>
           <button type="submit" className="btn btn-sm btn-primary mt-3">Sign up</button>
       </form>
       {error && <h6 className="m-3 text-danger text-break"> User account not created. Please try again.</h6>}
       {success && <h6 className="m-3 text-success text-break"> User Account created !! </h6>}
       </div>
       
   </div>
   </div>
  
   </>
  )
}

export default Signup
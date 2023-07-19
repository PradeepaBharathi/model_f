import React from 'react'
import { useGlobalContext } from "../../Context/context";
import { useNavigate } from 'react-router-dom';

function LogButton() {
    const {isLogged, setIsLogged, setCurrentUser} = useGlobalContext();
    const navigate = useNavigate();

    function handleOutClick(e){
        localStorage.removeItem("tokenAuth");
        localStorage.removeItem("loggedUser");
        localStorage.removeItem("loggedUsername");
        localStorage.removeItem("loggedUserID");
        setIsLogged(false);
        setCurrentUser({})
        navigate('/login');
    }
    function handleInClick(e){
        localStorage.getItem("tokenAuth");
        if(!isLogged){
            navigate('/login');
        }
    }
  return (
  <>
  <div className=" d-flex justify-content-end align-items-end mt-3"> 
        {localStorage.getItem("loggedUsername") && <button className="btn btn-info m-3" onClick={handleOutClick}>Log Out</button> }    
        {!localStorage.getItem("loggedUsername") && <button className="btn btn-info m-3" onClick={handleInClick}>Log In</button> }    
        </div>
  </>
  )
}

export default LogButton
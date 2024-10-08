import React, {useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import Alert from "./Alert";
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom";
const Login = () => {
  const [credentials, setCredentials] = useState({email:"",pass:""})
  const host ='http://localhost:5000'
  const navigate = useNavigate();

  //alert
  const context = useContext(NoteContext);
  const {alert,alertMessage} = context;
  //function to submit the form
  const handleClick= async(e)=>{
    e.preventDefault();
    const response =await fetch(`${host}/api/auth/login`,{
      method:'POST',
      headers:{
        "Content-Type":"application/json",
        
      },
      body:JSON.stringify(credentials)
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      //redirect
      localStorage.setItem("token",json.authToken);
      navigate('/');
      alertMessage("Log In Successful","info");
    }
    else{
      console.log("object")
      alertMessage("Invalid Credentials","danger ");
    }
  }

  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  return (
    <div>
      <Alert alert={alert} />
      <form className="container" onSubmit={handleClick}>
        <div className=" my-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={onChange}
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="pass" className="form-label">
            Password
          </label>
          <input
            type="password"
            onChange={onChange}
            className="form-control"
            id="pass"
            name="pass"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <div>
        <Link to="/signup">Don't have a account? SignUp</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

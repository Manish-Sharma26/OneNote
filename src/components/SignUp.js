import React ,{useState,useContext} from "react";
import Alert from "./Alert";
import NoteContext from "../context/notes/NoteContext";
import {useNavigate,Link} from "react-router-dom";

const SignUp = () => {
  const [credentials, setCredentials] = useState({name:"",email:"",pass:""})
  const host ='http://localhost:5000'
  const navigate = useNavigate();

  const context = useContext(NoteContext);
  const {alert,alertMessage} = context;

  const handleClick= async(e)=>{
    e.preventDefault();
    const response =await fetch(`${host}/api/auth/signup`,{
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
      alertMessage("Sign Up Successful","info");
    }
    else{
      // console.log("object")
      alertMessage(json['error'],"danger ");
    }
  }

  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  return (
    <>
    <Alert alert={alert} />
    <div className="container">
       
      <form onSubmit={handleClick} className="my-2">
      <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            onChange={onChange}
            name="name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            onChange={onChange}
            className="form-control"
            id="email"
            name="email"
            required
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            required
            minLength={6}
            onChange={onChange}
            className="form-control"
            id="pass"
            name="pass"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            required
            minLength={6}
            onChange={onChange}
            className="form-control"
            id="cpassword"
            name="cpassword"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <div>
        <Link to="/login">Already have an account? LogIn</Link>
        </div>
    </div>
    </>
  );
};

export default SignUp;

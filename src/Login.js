import React,{useState} from "react";
import { Button } from "react-bootstrap";
import Header from "./Header";
import {useNavigate} from "react-router-dom"
import Footer from "./Footer";

function Login(){
    const navigate=useNavigate();
    const[password,setPassword]=useState("");
    const[email,setEmail]=useState("");
      
  const loginup=async()=>{
    try {
        // console.log("jbdf")
        let userInfo = JSON.parse(localStorage.getItem('user-info-Copy'));
        console.log(userInfo);
    
        if(userInfo.email === email){
            if(userInfo.password === password){
                console.log("user loged in successfully")
                navigate("/")
    
            }else{
                alert("password is incorrect")
                console.log("password is incorrect")
            }
        }else{
            alert("email is incorrect")
            console.log("email is incorrect")
        }
    } catch (error) {
        console.log(error)
    }
   
    
    }

    return(
        <>
        <Header/>
        <div className="login-con">
            <h1>helo login</h1> <br />
           
            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/> <br /> <br />
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/> <br /> <br />
            <Button onClick={loginup}>Submit</Button>
        </div>
        <Footer/>
        </>
    )
}
export default Login;

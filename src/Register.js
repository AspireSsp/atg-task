import React,{useState ,useEffect} from "react";
import { Button } from "react-bootstrap";
// import {Navigate} from "react-router-dom";
import {useNavigate} from "react-router-dom"
import Header from "./Header";
import Footer from "./Footer";



function Register(){
    useEffect(()=>{
        if(localStorage.getItem('user-info'))
        {
            navigate("/Login")
        }
    })
    const[name,setName]=useState("");
    const[password,setPassword]=useState("");
    const[email,setEmail]=useState("");
    const navigate=useNavigate();

    function signUp(){
        let result={name,password,email}
        console.log(result);
        localStorage.setItem("user-info",JSON.stringify(result))
        localStorage.setItem("user-info-Copy",JSON.stringify(result))
        navigate("/Login")
    
    }

       
    
   
    
    return(
        <>
        <Header/>
        <div className="register-con">
            <h1>user sing up</h1> <br />
            <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/> <br /><br />
            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/> <br /> <br />
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/> <br /> <br />
            <Button type="submit" onClick={signUp}>Submit</Button>
        </div>
        <Footer/>
        </>
    )
}
export default Register;

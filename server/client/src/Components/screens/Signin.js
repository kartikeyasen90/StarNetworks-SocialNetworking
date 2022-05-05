import React, { useState,useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from "materialize-css"
import { Usercontext } from '../../App';

export const Signin = () => {
  const nevigate=useNavigate();
  const {state,dispatch}=useContext(Usercontext)
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const PostData=()=>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
       M.toast({html:"Invalid email ID",classes:"#ef5350 red lighten-1"})
       return
    }//this is regular expression which checks that the given email is in valid format or not
      fetch("/signin",{   // we have to pass server path and proxy in pacakage.json
        method:"post",
        headers:{
          "Content-Type":"application/json"         // this is fetch api , it connect our client to server 
        },
        body:JSON.stringify({
          
          email:email,
          password:password
        })
      }).then(res=>res.json()).then(data=>{
        if(data.error)
        {
          console.log(data.error);
            M.toast({html:data.error,classes:"#ef5350 red lighten-1"}) // give us pop up notification 
        }
        else
        {
           localStorage.setItem("jwt",data.token)          // jwt to token assign kar rhe h                  // ager ye dono line nhi likhenge
           localStorage.setItem("user",JSON.stringify(data.user)) // or user ko user ki information de rhe h // to createpost karte time you must be logged in likha ayyega
          dispatch({type:"USER",payload:data.user})
           M.toast({html:"signed in successfully",classes:"#e1bee7 purple lighten-4"})
          nevigate("/")
        }
      }).catch(err=>{
        console.log(err);
      })
  }
  return (
    
    <div className='bg-img'>
        <div className="content">
        <header>Login</header>
        <form >
          <div class="field">
          <span class="fa fa-user"></span>

            <input
              type="email"
              placeholder='Email'
              value={email}
              onChange={(e)=>{
              setemail(e.target.value)
            }}
            />
            </div>
            <div class="field space">
            <span class="fa fa-lock"></span>
            <input
            onChange={(e)=>{
              setpassword(e.target.value)
            }}

              type="password"
              placeholder='Password'
              value={password}
            />
            <span class="show">SHOW</span>
            </div>
            <div className="field">
            <input onClick={(e)=>{
              e.preventDefault()
              PostData()
            }} type="submit" value="Log in"/>
          </div>
            <h6 className='click' >No account?<Link to="/signup"> Click here</Link></h6>

        </form>
    </div> 
    </div>
  )
}

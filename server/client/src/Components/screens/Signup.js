import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from "materialize-css"

export const Signup = () => {
  const nevigate=useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [image, setImage] = useState("");
  const [url, seturl] = useState(undefined)
  
  useEffect(() => {
    if(url)
    {
      uploadfields()
    }
  }, [url])
  

  const uploadpic=()=>{
    const data=new FormData()
        data.append("file",image)
        data.append("upload_preset","socialnetwork")
        data.append("cloud_name","kartik23cloud")
        fetch("http://api.cloudinary.com/v1_1/kartik23cloud/image/upload",{
            method:"post",
            body:data                                                           //   ye fetch cloudinary me photo upload karne ke kam aa raha h
        }).then(res=>res.json())
        .then(data=>{
            seturl(data.url);   
        }).catch(err=>{
            console.log(err);
        })

  }
  const uploadfields=()=>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html:"Invalid email ID",classes:"#ef5350 red lighten-1"})
      return
   }//this is regular expression which checks that the given email is in valid format or not
     fetch("/signup",{   // we have to pass server path and proxy in pacakage.json
       method:"post",
       headers:{
         "Content-Type":"application/json"         // this is fetch api , it connect our client to server 
       },
       body:JSON.stringify({
         name:name,
         email:email,
         password:password,
         pic:url
       })
     }).then(res=>res.json()).then(data=>{
       if(data.error)
       {
           M.toast({html:data.error,classes:"#ef5350 red lighten-1"}) // give us pop up notification 
       }
       else
       {
         M.toast({html:data.message,classes:"#e1bee7 purple lighten-4"})
         nevigate("/signin")
       }
     }).catch(err=>{
       console.log(err);
     })
  }
  const PostData=()=>{
    if(image)
    {
      uploadpic()
    }
    else
    {
      uploadfields()
    }
  }
  return (
    <div className='bg-img'>
    <div className="content">
    <header>Sign up</header>
    <form >
    <div class="field">
      <span class="fa fa-pen"></span>

        <input
          type="text"
          placeholder='Username'
          value={name}
          onChange={(e)=>{
          setname(e.target.value)
        }}
        />
        </div>
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
        <div class="file-field input-field">
<div className="btn">
    <span>Add Profile Photo</span>
    <input type="file"
        onChange={(e)=>{
            setImage(e.target.files[0])
        }}
    />
</div>
<div className="file-path-wrapper">
    <input class="file-path validate" type="text"/>
</div>
</div>
        <div className="field">
        <input onClick={(e)=>{
          e.preventDefault()
          PostData()
        }} type="submit" value="Sign up"/>
      </div>
        <h6 className='click' >Already have account?<Link to="/signin"> Click here</Link></h6>

    </form>
</div> 
</div>
  )
}

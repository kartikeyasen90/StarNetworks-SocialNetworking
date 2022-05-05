import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import M from "materialize-css"

export const Createpost = () => {
    const nevigate=useNavigate();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [url, seturl] = useState("");
    useEffect(() => {
      if(url)                // jab bhi url change hoga to post create karenge
      {
        fetch("/createpost",{   // we have to pass server path and proxy in pacakage.json
            method:"post",
            headers:{
              "Content-Type":"application/json" ,        // this is fetch api , it connect our client to server 
              "Authorization":"Bearer "+localStorage.getItem("jwt") // ye wahi h jo hum postman me kar rahe the 
            },
            body:JSON.stringify({
              
              title,
              body,
              pic:url         
            })
          }).then(res=>res.json()).then(data=>{
            if(data.error)
            {
              
                M.toast({html:data.error,classes:"#ef5350 red lighten-1"}) // give us pop up notification 
            }
            else
            {
              M.toast({html:"Post created succesfully",classes:"#e1bee7 purple lighten-4"})
              nevigate("/")
            }
          }).catch(err=>{
            console.log(err);
          })
      }
    }, [url])
    
    const postDetails=()=>{
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
  return (
      <div className='createpost'>
      <div className='p'></div>
    <div className='card input-field '
    style={{
        backgroundColor:"#ffe6e6",
        margin:"100px",
        maxWidth:"500px",
        padding:"20px",
        textAlign:"center"
    }}>
    <h4 style={{fontFamily:"cursive"}}>New Post</h4>
        <input type="text" placeholder='Title'
        value={title}
            onChange={(e)=>{
                setTitle(e.target.value)
            }}
        />
        <input type="text" placeholder='Description'
            value={body}
            onChange={(e)=>{
                setBody(e.target.value)
            }}
        />
        <div class="file-field input-field">
            <div className="btn" style={{borderRadius:"10px"}}>
                <span>Add Photo</span>
                <input type="file"
                    onChange={(e)=>{
                        console.log(e.target.files)
                        setImage(e.target.files[0])
                    }}
                />
            </div>
            <div className="file-path-wrapper">
                <input class="file-path validate" type="text"/>
            </div>
         </div>   
         <button style={{borderRadius:"10px"}} onClick={()=>{
             postDetails()
         }}
         className='btn waves-effect waves-light #e57373 red lighten-2'>
             Upload Post
         </button>

    </div>
    </div>
  )
}

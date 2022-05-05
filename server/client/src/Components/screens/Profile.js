import React, { useContext, useEffect,useState } from 'react'
import { Usercontext } from '../../App'

export const Profile = () => {
  const [mypics, setmypics] = useState([])
  const {state,dispatch} = useContext(Usercontext)
  useEffect(() => {
    fetch("/mypost",{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result=>{
      // console.log(result);
      setmypics(result.mypost)
    })
  }, [])
  
  return (
   <div className='homepage'>
   <div className='p'></div>
    <div style={{margin:"0px auto",backgroundColor:"rgb(245, 232, 218)",borderRadius:"20px", maxWidth:"700px"}}>
        <div style={{
          display:"flex",
          
          justifyContent:"space-around",
          margin:"100px 0px",
          borderBottom:"1px solid grey"
        }} >
            <div>
                 <img style={{width:"160px",height:"160px",borderRadius:"80px",borderColor:"black",margin:"20px 0px"}}
                 src={state?state.pic:"loading"}
                 />
            </div>
            <div style={{color:"black"}}>
               <h4 style={{fontWeight:"bolder"}}>{state?state.name:"loading..."}</h4>
               <h5>{state?state.email:"loading..."}</h5>
               <div style={{
                 display:"flex",
                 justifyContent:"space-around",
                 width:"108%"
               }}>
                 <h6>{mypics.length} posts</h6>
                 <h6>{state?state.followers.length:"0"} followers</h6>
                 <h6>{state?state.following.length:"0"} following</h6>
               </div>
            </div>
            
        </div>
        <div className='gallery'>
          {
             mypics.map(item=>{
               return(
                <img key={item._id} style={{marginBottom:"83px",width:"250px",height:"170px"}} className='item' src={item.photo}/>
               )
             }).reverse()
          }
           
        </div>
    </div>
    <div className='p'></div>
    <div className='p'></div>
    <div className='p'></div>
    <div className='p'></div>
    <div className='p'></div>
    <div className='p'></div>
    <div className='p'></div>
    <div className='p'></div>
    <div className='p'></div>
    <div className='p'></div>
    <div className='p'></div>
    <div className='p'></div>
    <div className='p'></div>
    
    </div>
  )
}


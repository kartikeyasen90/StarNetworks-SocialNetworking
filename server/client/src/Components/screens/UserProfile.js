import React, { useContext, useEffect,useState } from 'react'
import { Usercontext } from '../../App'
import { useParams } from 'react-router-dom'

export const UserProfile = () => {
    const [showfollow, setshowfollow] = useState()
  const [prof, setprof] = useState({})
  const [userprofile, setuserprofile] = useState(null)
  const [useremail, setuseremail] = useState(null)
  const [Profile, setProfile] = useState()
  const [posts, setposts] = useState([])
  const [userpic, setuserpic] = useState("")
  const {state,dispatch} = useContext(Usercontext)
  const {userid}=useParams()
//   console.log(userid)
  useEffect(() => {
      setshowfollow(state?!state.following.includes(userid):true)
    fetch(`/user/${userid}`,{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result=>{
      setuserprofile(result.user.name)
      setuseremail(result.user.email)
      setProfile(result.posts.length)
      setposts(result.posts)
      setprof(result)
      setuserpic(result.user.pic)
    })
  }, [])
  
  const followuser=()=>{
    fetch("/follow",{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            followId:userid
        })
    }).then(res=>res.json())
    .then(data=>{
        dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
        localStorage.setItem("user",JSON.stringify(data))
        setprof((prevstate)=>{
            return{
                user:{
                    ...prevstate,
                    followers:[...prevstate.user.followers,data._id]
                }
            }
        })
        setshowfollow(false)
        
    })
    
  }

  const unfollowuser=()=>{
    fetch("/unfollow",{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            followId:userid
        })
    }).then(res=>res.json())
    .then(data=>{
        dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
        localStorage.setItem("user",JSON.stringify(data))
        
        setprof((prevstate)=>{
            const newFollower=prevstate.user.followers.filter(item=>item!=data._id)
            return{
                user:{
                    ...prevstate,
                    users:{
                        ...prevstate.user,
                        followers:newFollower
                    }
                }
            }
        })
        setshowfollow(true)
        window.location.reload();
    })
  }

  return (
      <div className='homepage'>
      <div className='p'></div>
      {
          posts?
          <div style={{margin:"0px auto",backgroundColor:"rgb(245, 232, 218)",borderRadius:"20px", maxWidth:"700px"}}>
        <div style={{
          display:"flex",
          
          justifyContent:"space-around",
          margin:"100px 0px",
          borderBottom:"1px solid grey"
        }}>
            <div>
                 <img style={{width:"160px",height:"160px",borderRadius:"80px",borderColor:"black",margin:"20px 0px"}}
                 src={userpic}
                 />
            </div>
            <div style={{color:"black"}}>
               <h4 style={{fontWeight:"bolder"}}>{userprofile}</h4>
               <h6>{useremail}</h6>
               <div style={{
                 display:"flex",
                 justifyContent:"space-around",
                 width:"108%"
               }}>
                 <h6>{Profile} posts</h6>
                 <h6>{prof.user===undefined?"loading...":prof.user.followers===undefined?"loading...":prof.user.followers.length} followers</h6>
                 <h6>{prof.user===undefined?"loading...":prof.user.following===undefined?"loading...":prof.user.following.length} following</h6>
               </div>
               <br/>
               {!JSON.parse(localStorage.getItem("user")).following.includes(userid) && showfollow?<button
                    onClick={()=>followuser()}
                    className="btn waves-effect waves-light #e57373 blue lighten-2" type="submit" name="action">Follow
                    <i class="material-icons right"> person_add </i>
               </button>
               :<button
                    onClick={()=>unfollowuser()}
                    className="btn waves-effect waves-light #e57373 red lighten-2" type="submit" name="action">Unfollow
                    <i class="material-icons right">person</i>
               </button>
               }
               
            </div>
        </div>
        <div className='gallery'>
          {
            posts.map(item=>{
               return(
                <img key={item._id} style={{marginBottom:"83px",width:"250px",height:"170px"}} className='item' src={item.photo}/>
               )
             }).reverse()  
          }
           
        </div>
    </div>
    : "Loading..."

      }
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


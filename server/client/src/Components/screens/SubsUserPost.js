import React, { useContext, useEffect ,useState} from 'react'
import { Usercontext } from '../../App'
import M from "materialize-css"
import { Link } from 'react-router-dom'
export const SubscribedUserPost = () => {
  const {state,dispatch}=useContext(Usercontext)
  const [data, setdata] = useState([])
  useEffect(()=>{
    fetch("/getfollowingposts",{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result=>{
      console.log(result);
      setdata(result)
    })
  },[])

  const likePost=(id)=>{
     fetch("/like",{
       method:"put",
       headers:{
         "Content-Type":"application/json",
         "Authorization":"Bearer "+localStorage.getItem("jwt")
       },
       body:JSON.stringify({
         postId:id
       })
     }).then(res=>res.json())
     .then(result=>{
          //  console.log(result);
          const newData=data.map(item=>{
            if(item._id==result._id)
            {
              return result
            }                                    // ye map function samjna h isse sayad instant like unlike pata chal rahe h
            else
            {
              return item
            }
          })
          setdata(newData);
     }).catch(err=>{
       console.log(err);
     })
  }
  const unlikePost=(id)=>{
    fetch("/unlike",{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId:id
      })
    }).then(res=>res.json())
    .then(result=>{
      const newData=data.map(item=>{
        if(item._id==result._id)
        {
          return result
        }
        else
        {
          return item
        }
      })
      setdata(newData);
 }).catch(err=>{
   console.log(err);
 })
    
 }

const deletePost=(postid)=>{
  fetch(`/deletepost/${postid}`,{
    method:"delete",
    headers:{
      "Authorization":"Bearer "+localStorage.getItem("jwt")
    }
  }).then(res=>res.json())
  .then(result=>{
    console.log(result);
    if(result.error)
    {
      return M.toast({html:"You can not delete this post",classes:"#ef5350 red lighten-1"})
    }
    const newData=data.filter(item=>{
      return item._id!==result._id
    })
  setdata(newData)
  })
}

const makecomment=(text,postId)=>{
  fetch("/comment",{
    method:"put",
    headers:{
      "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
    },
    body:JSON.stringify({
      postId,
       name:localStorage.getItem("user").name,
      text
    })
  }).then(res=>res.json())
  .then(result=>{
    console.log(result);
    const newData=data.map(item=>{
      if(item._id==result._id)
      {
        return result
      }
      else
      {
        return item
      }
    })
    setdata(newData);
  }).catch(err=>{
    console.log(err);
  })
}

  return (
    <div className='homepage'>
    <div className='p'></div>
    <div className='home' >
    {data.map(item=>{                           // mapping the posts
      return(
        <div className='card home-card' key={item._id}> 
        <header style={{backgroundColor:'white',borderRadius:"10px 10px 0px 0px",padding:'3px'}}>
        <h5 style={{marginLeft:"10px",fontWeight:"bolder"}}><Link to={"/profile/"+item.postedby._id}>{item.postedby.name}</Link>
        <i onClick={()=>{deletePost(item._id)}} class="material-icons " style={{float:"right"}}>delete</i>
        </h5>
        </header>
        <div className='card-image'>
          <img src={item.photo}/>
        </div>
        <div className='card-content'>
        {item.likes.includes(state._id)?  // agar item ke likes array mr id h to unlike ka option warna like ka option
          <i onClick={()=>{unlikePost(item._id)}} class="material-icons ">favorite</i>:      // isse hum like unlike ko hide kar rhe h ki agar like 
          <i onClick={()=>{likePost(item._id)}} class="material-icons ">favorite_border</i> // kar diya to like ka button hide ho jaye to waaps like nhi kar payega
        }
        <h6>{item.likes.length} Likes</h6>
          <h5 style={{fontWeight:"bolder"}}>{item.title}</h5>
          <p>Description: {item.body}</p>
          {
            item.comments.map(record=>{
              return(
                <h6 key={record._id}>{record.text}</h6>
              )
            })
          }
          <form onSubmit={(e)=>{
            e.preventDefault()
            makecomment(e.target[0].value,item._id)
          }}>
          <input type="text" placeholder='Add comment:'/>
          </form>
        </div>
      </div>
      )
    }).reverse()}
      
    </div>
    <div className='p2'></div>
    </div>
  )
}

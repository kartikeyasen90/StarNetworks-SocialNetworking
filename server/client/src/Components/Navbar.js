import react, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Usercontext } from "../App";

const Navbar=()=>{
  const {state,dispatch}=useContext(Usercontext)
  const nevigate=useNavigate()
  const renderList=()=>{
    if(state)
    {
      return [
        <>

        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/createpost">Createpost</Link></li>
        <li><Link to="/myfollowingposts">My Following Posts</Link></li>
        <li><button
             onClick={()=>{
                localStorage.clear()
                dispatch({type:"CLEAR"})
                nevigate("/signin")
             }}
             className="btn waves-effect waves-light #e57373 blue lighten-2
            " type="submit" name="action">Log out
            </button></li>
        </>
      ]
    }
    else
    {
      return[
        <>
          <li><Link to="/signin">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        </>
      ]
    }
  }
    return (
      <>
    <nav className="des" style={{padding:"0px 10px"}}>
    <div className="nav-wrapper">
      <Link to={state?"/":"/signin"} className="brand-logo">StarNetworks</Link>
      <Link to={"#"} className="sidenav-trigger" data-target="mobile-nav">
        <i className="material-icons">menu</i>
      </Link>
      <ul  className="right hide-on-med-and-down">
        {renderList()}
      </ul>
    </div>
  </nav>
  <ul className="sidenav #e0f7fa cyan lighten-5"  id="mobile-nav">
  <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/createpost">Createpost</Link></li>
        <li><Link to="/myfollowingposts">My Following Posts</Link></li>
        <li><button
             onClick={()=>{
                localStorage.clear()
                dispatch({type:"CLEAR"})
                nevigate("/signin")
             }}
             className="btn waves-effect waves-light #e57373 blue lighten-2
            " type="submit" name="action"
            style={{marginLeft:"30px", borderRadius:"13px"}}
            >Log out

            </button></li>
  </ul>
  </>
  )    
}
export default Navbar;
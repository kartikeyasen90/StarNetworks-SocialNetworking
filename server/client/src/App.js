
import './App.css';
import Navbar from './Components/Navbar';
import {BrowserRouter,Route,Routes, useNavigate} from "react-router-dom";
import { Home } from './Components/screens/Home';
import { Signup } from './Components/screens/Signup';
import { Signin } from './Components/screens/Signin';
import { Profile } from './Components/screens/Profile';
import { Createpost } from './Components/screens/Createpost';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { initialState, reducer } from './reducers/userReducer';
import { UserProfile } from './Components/screens/UserProfile';
import { SubscribedUserPost } from './Components/screens/SubsUserPost';

export const Usercontext=createContext()
const Routing=()=>{
  const nevigate=useNavigate()
  const {state,dispatch}=useContext(Usercontext)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    if(user)
    {
      dispatch({type:"USER",payload:user})
    }
    else{
      nevigate("/signin")
    }
  },[])
  return(
    <>
    {
      window.location.pathname==="/signin" || window.location.pathname==="/signup"
      ?
      <Routes>
      <Route  path='/signin' element={<Signin/>}/>
       <Route  path='/signup' element={<Signup/>}/>
    </Routes>
    :
    <>
    <Navbar/>
    <Routes>
    <Route exact path='/' element={<Home/>}/>
    <Route exact path='/profile' element={<Profile/>}/>
    <Route  path='/createpost' element={<Createpost/>}/>
    <Route  path='/myfollowingposts' element={<SubscribedUserPost/>}/>
    <Route path='/profile/:userid' element={<UserProfile/>}/>
    </Routes>
    </>

    }
    
    </>
  )
}
function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <Usercontext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <Routing/>
    </BrowserRouter>
    </Usercontext.Provider>
  );
}

export default App;

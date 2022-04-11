import React,{useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { dispatchLogin,fetchUser,dispatchGetUser } from "./components/redux/actions/authAction";
import Home from "./components/Home";
import Register from "../src/components/auth/Register";
import ActivationEmail from "../src/components/auth/ActivationEmail"
import Login from "../src/components/auth/Login";
import Navbar from "./components/Navbar/Navbar";
import FoodMenu from "./components/RestaurantItem/FoodMenu";
import Cart from "./components/Cart/Cart";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

function App() {
const dispatch=useDispatch()
const auth=useSelector(state=>state.token)
const token = useSelector(state => state.token)
useEffect(()=>{
const userinfo=localStorage.getItem('userinfo')

if(userinfo){
  const getToken=async()=>{
   
    const res = await axios.post('/refreshToken')
    console.log(res)
    dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
  }
  getToken()
}
},[auth.isLogged,dispatch])

useEffect(() => {
  if(token){
    const getUser = () => {
      dispatch(dispatchLogin())

      return fetchUser(token).then(res => {
        dispatch(dispatchGetUser(res))
      })
    }
    getUser()
  }
},[token,dispatch])

  return (
    <>

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logo" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/activate/:activation_token" element={<ActivationEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/view_menu" element={<FoodMenu/>} />
        <Route path="/cart" element={<Cart/>} />
       
      </Routes>
    </>
  );
}

export default App;

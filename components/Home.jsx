import React, { useContext } from 'react'
import MyContext from '../context/provider'
import supabase from '../src/supabase'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Products from './Products'
import AddProduct from './AddProduct'

const Home = () => {
  const navigate = useNavigate()
  const {user}=useContext(MyContext)
  const logOut = async()=>{
    let {error} = await supabase.auth.signOut()
    if (error) {alert(error); return;}
  }
  if(!user){
    return <Button variant='contained' onClick={()=>{navigate('/login')}}>LogIn</Button>
  }else{
    return <div className='user'>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>PhoneNo: {user?.phoneNo}</p>
      <p>Address: {user?.address}</p>
      <Button variant='contained' onClick={()=>{logOut()}}>LogOut</Button>
      <u />
      <Products/>
    </div>
  }
}

export default Home

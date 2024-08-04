import { Routes, Route } from "react-router-dom"
import Login from "../components/Login"
import Home from "../components/Home"
import Signup from "../components/Signup"
import MyContext from '../context/provider.js'
import { useEffect, useState } from "react"
import supabase from "./supabase.js"

function App() {
  const [user,setUser]=useState(null)
  const [session,setSession]=useState(null)
  useEffect(()=>{
    const {data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user?.identities[0]?.identity_data)
    })
    return () => subscription.unsubscribe()
  },[])
  return (
    <>
      <MyContext.Provider value={{user,session}}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      </MyContext.Provider>
    </>
  )
}

export default App

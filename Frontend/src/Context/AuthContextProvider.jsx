import React, { createContext, useEffect, useState } from 'react'


export const AuthContext=createContext()
const AuthContextProvider = ({children}) => {
const[isAuth,setIsAuth]=useState(false)
const [user,setUser]=useState({})
const [id,setId]=useState(null)

const authentication=()=>{
  const token=localStorage.getItem("buycartoken")||""
  console.log(token,"tokken")
  if(token!==""){
    setIsAuth((pre)=>true)
  }
}
useEffect(()=>{
authentication()
},[])
console.log(isAuth,"isAuth")
  return <AuthContext.Provider value={{id,setId,isAuth,setIsAuth,user,setUser}}>{children}</AuthContext.Provider>
}

export default AuthContextProvider

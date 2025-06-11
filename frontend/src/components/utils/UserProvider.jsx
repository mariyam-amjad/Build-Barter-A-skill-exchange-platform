import React, { createContext, useContext, useState } from 'react'
import { defaultUser } from './defaultUser'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({...defaultUser})

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext)
}
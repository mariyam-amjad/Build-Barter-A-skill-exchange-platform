import React, { createContext, useContext, useState } from 'react'

const AlertContext = createContext()

export const AlertProvider = ({ children }) => {
    const [alert, renderAlert] = useState({message:'', type:'warning', id: Date.now()})

    const setAlert = ({ message, type }) => {
      renderAlert({ message, type, id: Date.now() });
  }

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  )
}

export const useAlert = () => {
  return useContext(AlertContext)
}
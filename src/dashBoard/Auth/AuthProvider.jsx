import React,{createContext,useState} from 'react'

const AuthContext = createContext({})









export const AuthProvider = ({children}) => {

    const [Auth, setAuth] = useState(JSON.parse(localStorage.getItem('logged')))
    const [User, setUser] = useState()
  return (
    <AuthContext.Provider value={{Auth , setAuth}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
import { getCurrentUser, userDocument } from "@/lib/appwrite";
import React, { createContext,useContext,useState,useEffect} from "react";

interface GlobalContextType{
    isLoggedIn:boolean
    setIsLoggedIn:React.Dispatch<React.SetStateAction<boolean>>
    user:any | null
    setUser:React.Dispatch<React.SetStateAction<any| null>>
    isLoading:boolean
    setIsLoading:React.Dispatch<React.SetStateAction<boolean>>
}
const GlobalContext=createContext<GlobalContextType | undefined>(undefined)
export const useGlobalContext =(): GlobalContextType =>{
    const context=useContext(GlobalContext)
    if (!context) throw new Error('use GlobalContext must be used with a GlobalProvider')
    return context

}

interface GlobalProviderProps{
    children:React.ReactNode
}

export const GlobalProvider:React.FC <GlobalProviderProps> =({children}) =>{
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading,setIsLoading]=useState(true)
    useEffect(()=>{
        getCurrentUser().then((res)=>{
            if (res){
                    setIsLoggedIn(true)
                    setUser(res)
            }
            else{
                setIsLoggedIn(false)
                setUser(null)
            }

        }).catch((error) =>{

console.log(error)
        }).finally(()=>{
            setIsLoading(false)
        })
        
    })
    return(
        <GlobalContext.Provider
        
        value={{
isLoggedIn,
setIsLoggedIn,
user,
setUser,
isLoading,
setIsLoading

        }}
        >
{children}
        </GlobalContext.Provider>
    )
}
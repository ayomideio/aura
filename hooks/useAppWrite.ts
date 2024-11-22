import { getAllPosts } from "@/lib/appwrite"
import { useEffect, useState } from "react"
import { Alert } from "react-native"

interface UseAppWriteProp{
    fn:()=>Promise <any>
}

export const useAppWrite =({fn}:UseAppWriteProp) =>{
    const [data, setData] = useState(null)
    const [isLoading,setIsLoading]=useState(false)
    const fetchData= async():Promise<void> =>{
         setIsLoading(true)
         try {
          const response=await fn()
          setData(response)
         } catch (error) {
          Alert.alert('Error',Error.name)
         }
         finally{
          setIsLoading(false)
         }
        }  
        useEffect(()=>{
      
        fetchData()
        
          },[])
          const refetch=() =>fetchData()
        
          return {data,isLoading,refetch}
}
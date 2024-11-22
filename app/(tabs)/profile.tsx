import { StyleSheet, Text, View,Image,Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, GestureHandlerRootView, NativeViewGestureHandler, RefreshControl } from 'react-native-gesture-handler'
import {images} from '@/constants'
import SearchInput from '@/components/SearchInput'
import {Trending} from '@/components/Trending'
import { getAllPosts, getUserPosts, searchPosts } from '@/lib/appwrite'
import { useAppWrite } from '@/hooks/useAppWrite'
import EmptyState from '@/components/EmptyState'
import { VideoCard } from '@/components/VideoCard'
import { useLocalSearchParams } from 'expo-router'
import { useGlobalContext } from '@/context/global-provider'

const profile = () => {

  const {user,setUser,isLoggedIn,setIsLoggedIn}=useGlobalContext()
  console.log(`user id ${JSON.stringify(user)}`)
  const profileFn=  ()=>searchPosts(user?.$id)
const {data:posts,refetch }= useAppWrite({fn:profileFn})
 const [refresing, setRefresing] = React.useState(false)


const onRefresh=async() =>{  
 setRefresing(true)

 setRefresing(false)
}
console.log(posts)
  return (
   <GestureHandlerRootView>
    <SafeAreaView className='bg-primary h-full'>
     
     <FlatList 
     data={posts}
     keyExtractor={(item)=>item.$id.toString()}

     renderItem={(({item})=>(
 <VideoCard  video={item} />

     )

     )}

     ListHeaderComponent={
       () =>(
        
        <View>

        </ View>
         
        
       )
     }
     ListEmptyComponent={
       ()=>(
         <EmptyState 
         title='No Videos'
         subtitle='No videos found for this search query'
         
         />
       )
     }
     refreshControl={<RefreshControl  
     refreshing={refresing}
     onRefresh={onRefresh}
     />}
     
     />
    
    </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default profile


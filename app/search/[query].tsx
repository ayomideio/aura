import { StyleSheet, Text, View,Image,Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, GestureHandlerRootView, NativeViewGestureHandler, RefreshControl } from 'react-native-gesture-handler'
import {images} from '@/constants'
import SearchInput from '@/components/SearchInput'
import {Trending} from '@/components/Trending'
import { getAllPosts, searchPosts } from '@/lib/appwrite'
import { useAppWrite } from '@/hooks/useAppWrite'
import EmptyState from '@/components/EmptyState'
import { VideoCard } from '@/components/VideoCard'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {
  const {query}=useLocalSearchParams()
  const queryFn=  ()=>searchPosts(query.toString())
const {data:posts,refetch }= useAppWrite({fn:queryFn})
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
        
            <View className='my-6 px-6 space-y-6 mb-100'>
            
               <View>
               <Text className='font-pmedium text-gray-100'> Search rsults</Text>
               <Text className='font-psemibold text-white text-2xl'>{query}</Text>
               </View>
               
             
               
             

             <SearchInput 
             initialQuery={query.toString()}
           
             />
            

             <View className='h-20 w-full'></View>

         </View>
         
        
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

export default Search


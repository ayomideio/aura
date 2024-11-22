 import { StyleSheet, Text, View,Image,Alert} from 'react-native'
 import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, GestureHandlerRootView, NativeViewGestureHandler, RefreshControl } from 'react-native-gesture-handler'
import {images} from '@/constants'
import SearchInput from '@/components/SearchInput'
import {Trending} from '@/components/Trending'
import { getAllPosts } from '@/lib/appwrite'
import { useAppWrite } from '@/hooks/useAppWrite'
import EmptyState from '@/components/EmptyState'
import { VideoCard } from '@/components/VideoCard'
 
 const Home = () => {
const {data:posts, refetch}= useAppWrite({fn:getAllPosts})
  const [refresing, setRefresing] = React.useState(false)

const onRefresh=async() =>{
  setRefresing(true)
await refetch()
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
              <View className='justify-between  flex-row mb-6'>
                <View>
                <Text className='font-pmedium text-gray-100'> Welcome Back</Text>
                <Text className='font-psemibold text-white text-2xl'>jsmastery</Text>
                </View>
                
                <Image 
                source={images.logoSmall}
                className='max-w-[30px] max-h-[30px] mt-1.5 '
                resizeMode='contain'
                />
                
              </View>

              <SearchInput 
            
              />
              <View className='pt-10  h-[300px]'>
                <Text className='text-gray-100 font-pregular'>Trending Videos</Text>
{
  posts?  <Trending 

  posts={posts}
  />:<Text className='text-white'>No Posts</Text>
}
               
              </View>

              <View className='h-20 w-full'></View>

          </View>
          
         
        )
      }
      ListEmptyComponent={
        ()=>(
          <EmptyState 
          title=''
          subtitle=''
          
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
 
 export default Home
 
 
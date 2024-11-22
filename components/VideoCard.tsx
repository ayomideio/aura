import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import {icons} from'@/constants'



export interface VideoCreatorProp{
username:string
avatar:string
}

interface VideoProp{
    title:string
    thumbnail:string
    prompt:string
    video:string,
    creator:VideoCreatorProp
}
interface VideoCardProp {
    video:VideoProp
}
export const VideoCard:React.FC <VideoCardProp> = ({video}) => {
    const[play,setPlay]=useState(false)
    const {title,thumbnail,prompt,video:videoUrl,creator}=video
  return (
    <View className='flex-col px-4 mb-10  items-start flex-1'>
        <View className='flex-row gap-3 justify-center items-center w-full gap-x-0.5'>
            <View className='items-start flex-row flex-1 px-3'>
                <View className='w-[46px] h-[46px] rounded-lg border border-secondary-100 justify-center items-center '>
                <Image 
                source={{uri:creator.avatar}}
              className='w-full h-full rounded-lg border'
              resizeMode='cover'
                />  
                </View>
             
                <View className='gap-y-1 '>
                <Text className='ml-1 text-sm text-white font-psemibold' numberOfLines={1}> {title}</Text>
                <Text className='ml-1 text-xs text-gray-100 font-pregular' numberOfLines={1}> {creator.username}</Text>
                </View>

             
              
            </View>
            <Image 
               source={icons.menu} 
               className='h-[21px] w-[30px] mb-3 '
               resizeMode='contain'
               />
            <View>
           
            </View>
        </View>
        {
            play?(
                <Text className='text-white'>Playing</Text>
            ):(
                <TouchableOpacity 
                
                className='w-full h-60 rounded-xl justify-center items-center mt-3 px-2 mr-5'

                activeOpacity={0.7}
                    onPress={()=>setPlay(true)}
                
                >
                    <Image source={{uri:thumbnail}} 
                    
                    className='w-full h-full rounded-xl'
                    resizeMode='cover'
                    />
                    <Image 
                    source={icons.play}
                    className='absolute w-14 h-14'
                    />
                </TouchableOpacity>
            )
        }
        
    </View>
  )
}




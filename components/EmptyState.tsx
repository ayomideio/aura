import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import {images} from '@/constants'
import CustomButton from './CustomButton'


interface EmptyStateProps{
    title:string
    subtitle:string
}
const EmptyState:React.FC<EmptyStateProps> = (props) => {
  return (
    <View className='flex-1 justify-center items-center px-4 '>

        <Image 
        source={images.empty}

        className='h-[200px] w-[200px]'

        resizeMode='contain'
        />
<Text
className='font-psemibold text-white text-xl'
        
        >{props.title} </Text>
        <Text
        className='font-pmedium text-4sm text-gray-100'
        >{props.subtitle} </Text>



<CustomButton
title='Create Video'
containerStyles='w-full mt-7'
handlePress={()=>{
    
}}
/>
     
    </View>
  )
}

export default EmptyState


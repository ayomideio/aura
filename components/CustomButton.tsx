import { StyleSheet, Text, View ,TouchableOpacity, ViewStyle,StyleProp, TextStyle} from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

interface CustomButtonProps{
    title:string,
    handlePress:()=>void,
    containerStyles?:string,
    textStyles?:string,
    isLoading?:boolean

}
const CustomButton:React.FC <CustomButtonProps>= ({title,handlePress,containerStyles,textStyles,isLoading}) => {
  return (
    <TouchableOpacity 
    
    onPress={handlePress}
    activeOpacity={0.7}
disabled={isLoading}
    className={`bg-secondary rounded-xl min-h-[60px] min-w-[320px] justify-center items-center ${containerStyles}
    ${isLoading?'opacity-50':''}
    `}>
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
      <StatusBar 
      backgroundColor='#161622'
      style='dark'
      />
    </TouchableOpacity>
  )
}

export default CustomButton


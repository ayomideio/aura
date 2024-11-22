import { StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import {icons} from '../constants'


interface FormFieldProps{
    title:string,
    value:string,
    placeholder?:string,
    handleChangeText:(text:string)=>void,
    otherStyles?:string,
    keyboardType:string
}

const FormField:React.FC <FormFieldProps>= ({title,value,placeholder,handleChangeText,otherStyles,keyboardType}) => {
    const [showPassword,setShowPassword]=useState(false)
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title} </Text>

      <View className='w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:boder-secondary items-center flex-row'>

<TextInput

className='flex-1 text-base text-white font-psemibold'
value={value}
placeholder={placeholder}
placeholderTextColor={'#7b7b8b'}
onChangeText={handleChangeText}
secureTextEntry={title==='Password' && !showPassword}
// keyboardType={Keybo}
/>

{title==='Password' && (
    <TouchableOpacity onPress={()=>setShowPassword(!showPassword )} >
        <Image 
        source={!showPassword?icons.eye:icons.eyeHide}

        className='w-6 h-6'
        resizeMode='contain'
        />
    </TouchableOpacity>
)}
      </View>
    </View>
  )
}

export default FormField


import { StyleSheet, Text, TouchableOpacity, View,Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import {icons} from '../constants'
import { router, usePathname } from 'expo-router'


interface SearchInputProps{
    initialQuery?:string,
    
}

const SearchInput:React.FC <SearchInputProps>= ({initialQuery}) => {
    const pathName= usePathname()
    const [query , setQuery ] =initialQuery? useState(initialQuery): useState('')
  return (
    
    

      <View className='w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:boder-secondary items-center flex-row'>

<TextInput
 
className='flex-1 text-base text-white font-psemibold'
value={query}
placeholder='Search for a video topic'
placeholderTextColor={'#7b7b8b'}
onChangeText={(e)=>setQuery(e)}

/>

<TouchableOpacity 

onPress={()=>{
    if(!query) return Alert.alert('Missing Query','Please inpust something to search')

        if (pathName.startsWith('/search')) router.setParams({query}); else router.push(`/search/${query}`);
}}
>
    <Image source={icons.search}
    className='max-h-[20px] ml-auto'
    resizeMode='contain'
    />
</TouchableOpacity>
      </View>

  )
}

export default SearchInput


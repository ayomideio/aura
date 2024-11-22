import { StyleSheet, Text, View,Image,Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import {images} from '@/constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { signin } from '@/lib/appwrite'

const SignIn:React.FC = () => {
  const [form,setForm]=useState({
    email:'',
    password:''
  })
  const [isSubmitting,setIsSubmitting]=useState(false)
  const submit=async()=>{
    if(!form.email || !form.password) Alert.alert('Error','Please fill in all fields')
      setIsSubmitting(true)
    try{
   const result= await  signin({...form})
   router.replace('/home')
    }
    catch(error){
Alert.alert('Error',Error.name)
    }
    finally{
setIsSubmitting(false)
    }


  }
  return (
    <GestureHandlerRootView>
  <SafeAreaView className='bg-primary w-full h-full'>
    <ScrollView>
      <View className='w-full justify-center min-h-[85vh] px-6 my-6'>
      <Image 
      source={images.logo}
      className='max-w-[115px] max-h-[34px]'
      />

      <Text className='text-2xl text-white my-6 font-psemibold'>Sign In</Text>

<FormField 
title="Email"

value={form.email}
handleChangeText={(e:string)=> setForm({...form,email:e})}

otherStyles="mt-7"
keyboardType="email-address"
  
/>

<FormField 
title="Password"

value={form.password}
handleChangeText={(e:string)=> setForm({...form,password:e})}

otherStyles="mt-7"
keyboardType="password"
  
/>


<CustomButton 
handlePress={submit}
isLoading={isSubmitting}
title='Log In'
containerStyles='mt-10'
/>

<View className='justify-center items-center flex-row gap-2 mt-7'>
        <Text className='text-gray-100'>Don't have an account? <Link href='/sign-up' className='text-lg font-psemibold text-secondary-100'>Signup</Link></Text>
      </View>
      </View>

      
      
    </ScrollView>
  </SafeAreaView>
  </GestureHandlerRootView>
  )
}

export default SignIn


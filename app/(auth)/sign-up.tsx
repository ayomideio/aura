import { StyleSheet, Text, View,Image, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import {images} from '@/constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '@/lib/appwrite'

const SignUp:React.FC = () => {
  const [form,setForm]=useState({
    
    email:'',
    password:'',
    username:'',
  })
  const [isSubmitting,setIsSubmitting]=useState(false)
  const submit=async()=>{
    if(!form.username || !form.email || !form.password) Alert.alert('Error','Please fill in all fields')
      setIsSubmitting(true)
    try{
   const result= await  createUser({...form})
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
    <KeyboardAvoidingView
    
    behavior={Platform.OS==='ios'?'padding':'height'}

    >
      
  
    <ScrollView>
      <View className='w-full justify-center min-h-[85vh] px-6 my-6'>
      <Image 
      source={images.logo}
      className='max-w-[115px] max-h-[34px]'
      />

      <Text className='text-2xl text-white my-6 font-psemibold'>Sign Up</Text>


      <FormField 
title="Username"

value={form.username}
handleChangeText={(e:string)=> setForm({...form,username:e})}

otherStyles="mt-7"
keyboardType="email-address"
  
/>

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
title='Sign Up'
containerStyles='mt-10'
/>

<View className='justify-center items-center flex-row gap-2 mt-7'>
        <Text className='text-gray-100'>Already have an account? <Link href='/sign-in' className='text-lg font-psemibold text-secondary-100'>Login</Link></Text>
      </View>
      </View>

      
      
    </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
  </GestureHandlerRootView>
  )
}

export default SignUp


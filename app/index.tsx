import React from "react";
import { Image, StyleSheet, Platform, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import {images} from '../constants'
import CustomButton from "@/components/CustomButton";
import { getCurrentUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/global-provider";

const HomeScreen: React.FC = () => {
const {isLoading,isLoggedIn}=useGlobalContext()
  if(!isLoading && isLoggedIn) return <Redirect href='/home' /> 

  return (
    <GestureHandlerRootView className="flex-1">
   <SafeAreaView className="bg-primary h-full">

    <ScrollView  contentContainerStyle={{
      height:'100%',
  
    }}>
<View className="w-full h-full justify-center items-center px-4">

  <Image source={images.logo} 
  
  className="w-[130px] h-[84px]"
  resizeMode="contain"
  />
  <Image source={images.cards} 
  className="max-w-[380px] w-full max-h-[300px]"

  resizeMode="contain"
  
  />


  <View className="relative mt-5">
    <Text className="text-4xl text-white text-bold text-center ">Discover Endless Possibilities with{' '}
       <Text className="text-secondary-200  ">Aora</Text></Text>
       <Image
       source={images.path}
       className="w-[70px] h-[15px] absolute -bottom-2 -right-1"
       resizeMode="contain"
     />
  </View>
  <Text className="mt-7 text-sm3 font-pregular text-center text-gray-100"  >{`Where Creativity Meets Innovation: Embark on \n ${' '}a Journey of Limitless Exploration with Aora`}</Text>
<CustomButton title="Continue with Email" 
handlePress={()=>router.push('/sign-in')}

containerStyles={'w-full mt-7'}

/>
</View>
    </ScrollView>

   </SafeAreaView>
   </GestureHandlerRootView>
  );
};

export default HomeScreen;



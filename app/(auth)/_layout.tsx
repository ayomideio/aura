import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const  AuthLayout:React.FC= () => {
  return (
  <>
  <Stack screenOptions={{ headerShown: false }}>
  </Stack>
  <StatusBar />
  </>
  )
}

export default AuthLayout


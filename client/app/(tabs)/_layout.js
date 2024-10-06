import { Stack } from 'expo-router';
import {View, Text, Image} from 'react-native';
import {Tabs, Redirect} from 'expo-router' 
import {icons} from "../../constants"

const TabIcon = ({icon, color, name, focused})=>{
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', gap: 2}}>
      <Image source={icon} resizeMode='contain' style={{ width:focused? 35:25, height:focused? 35:25, marginTop: 0}}/> 
    </View>
  )
}

export default function workLayout() {
  return (
    <>
      <Tabs screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: "red",
            tabBarStyle:{
              backgroundColor: "#58008E",
              height: 60
            }
            }}>
        <Tabs.Screen name="Registration"
                     options={{
                      title:"name",
                      headerShown: false,  
                      tabBarIcon: ({color, focused})=>(
                      <TabIcon 
                      name=""
                      icon={icons.rightArrow}
                      color={color}
                      focused={focused}/> 
                      )}} />
          <Tabs.Screen name="index"
                     options={{
                      title:"index",
                      headerShown: false,  
                      tabBarIcon: ({color, focused})=>(
                      <TabIcon 
                      name=""
                      icon={icons.appointment}
                      color={color}
                      focused={focused}/> 
                      )}} />
          
          <Tabs.Screen name="prescription"
                     options={{
                      title:"prescription",
                      headerShown: false,  
                      tabBarIcon: ({color, focused})=>(
                      <TabIcon 
                      name=""
                      icon={icons.prescription}
                      color={color}
                      focused={focused}/> 
                      )}} />
          <Tabs.Screen name="Appointment Dashboard"
                     options={{
                      title:"Appointment Dashboard",
                      headerShown: false,  
                      tabBarIcon: ({color, focused})=>(
                      <TabIcon 
                      name=""
                      icon={icons.leftArrow}
                      color={color}
                      focused={focused}/> 
                      )}} />
          <Tabs.Screen name="Patient Details"
                     options={{
                      title:"Patient Details",
                      headerShown: false,  
                      tabBarIcon: ({color, focused})=>(
                      <TabIcon 
                      name=""
                      icon={icons.eye}
                      color={color}
                      focused={focused}/> 
                      )}} />
      </Tabs>
    </> 
  );
}
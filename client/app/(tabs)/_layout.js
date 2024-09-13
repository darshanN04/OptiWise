import { Stack } from 'expo-router';
import {View, Text, Image} from 'react-native';
import {Tabs, Redirect} from 'expo-router' 
import {icons} from "../../constants"

const TabIcon = ({icon, color, name, focused})=>{
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', gap: 2}}>
      <Image source={icon} resizeMode='contain' style={{ width:focused? 25:20, height:focused? 25:20, marginTop: 0}}/> 
      <Text style={{fontWeight: focused ? 900 : 200, color: 'white', fontSize: focused? 16:12}}>{name}</Text>
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
                      name="Registration"
                      icon={icons.home}
                      color={color}
                      focused={focused}/> 
                      )}} />
          <Tabs.Screen name="index"
                     options={{
                      title:"index",
                      headerShown: false,  
                      tabBarIcon: ({color, focused})=>(
                      <TabIcon 
                      name="Appointment"
                      icon={icons.appointment}
                      color={color}
                      focused={focused}/> 
                      )}} />
          <Tabs.Screen name="profile"
                     options={{
                      title:"profile",
                      headerShown: false,  
                      tabBarIcon: ({color, focused})=>(
                      <TabIcon 
                      name="Profile"
                      icon={icons.profile}
                      color={color}
                      focused={focused}/> 
                      )}} />
          <Tabs.Screen name="prescription"
                     options={{
                      title:"prescription",
                      headerShown: false,  
                      tabBarIcon: ({color, focused})=>(
                      <TabIcon 
                      name="Prescription"
                      icon={icons.prescription}
                      color={color}
                      focused={focused}/> 
                      )}} />

      </Tabs>
    </>
  );
}
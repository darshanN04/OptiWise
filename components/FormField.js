import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import {icons} from '../constants'



const FormField = ({title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.titlename}>{title}</Text>
      <View style={styles.inputbox}>
        <TextInput  style={styles.inputtext} 
                    placeholder={placeholder} 
                    value={value} 
                    onChangeText={handleChangeText}
                    secureTextEntry={placeholder==='Enter Password' && !showPassword}> 
        </TextInput>
        {placeholder==='Enter Password' && (
          <TouchableOpacity onPress={()=>
            setShowPassword(!showPassword)}>
              <Image source={!showPassword? icons.eye: icons.eyeHide} style={styles.passicon}/>
            </TouchableOpacity>
          
        )}

      </View>
    </View>
  )
}

export default FormField

const styles = StyleSheet.create({
    container: {
    },
    titlename: {
        fontSize: 16,
        paddingLeft: 5,
        paddingBottom: 0
    },
    inputbox: {
        width: 300,
        maxHeight: 60,
        borderRadius: 5,
        borderColor: 'red',
        borderWidth: 2,
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        padding: 10
    },
    inputtext: {
        flex: 1,
        padding: 10,
    },
    passicon:{
      width: 25,
      height: 25,
      resizeMode: "contain",

    }
})
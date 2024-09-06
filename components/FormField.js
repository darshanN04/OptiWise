import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const FormField = ({title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titlename}>{title}</Text>
      <View style={styles.inputbox}>
        <TextInput style={styles.inputtext} placeholder={placeholder}>{placeholder}</TextInput>
      </View>
    </View>
  )
}

export default FormField

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    titlename: {
        fontSize: 16,
        marginBottom: 5,
    },
    inputbox: {
        width: 100,
        height: 40,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        marginBottom: 20,
    },
    inputtext: {
        flex: 1,
        padding: 10,
        backgroundColor: "black"
    },
})
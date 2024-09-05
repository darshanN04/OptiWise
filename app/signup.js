import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Signup = () => {
    return (
        <View style={styles.container}>
            <Text>Signup</Text>
            <Link href="/" header={null}>go to index</Link>
            <Link href="/login" header={null}>go to login</Link>
        </View>
    )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'top',
        alignItems: 'top',
    }
})

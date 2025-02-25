import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Bg from '../../../components/bg'
import Navbar from '../../../components/navbar'
import { Dimensions } from 'react-native'

const profile = () => {
  return (
    <Bg>
        <Navbar/>
        <View style={styles.container}>
          
        </View>
    </Bg>
  )
}

export default profile



const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container:{
        width:windowWidth < 768 ? '50%' : '30%',
        height:windowWidth < 768 ? '50%' : '30%',
        backgroundColor:'indigo ',
    }
})
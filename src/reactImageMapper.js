import React, {Component} from 'react'
import {  View, Dimensions, StyleSheet, Image } from 'react-native'
import ImageMapper from 'react-image-mapper';
import  {PanGestureHandler} from 'react-native-gesture-handler'
const { width, height,  } = Dimensions.get('window')
//this generates an error because ImageMapper incorrectly generates code
export default class ImageMapperTest extends Component{
    state={x:0, y:0}
    constructor(props) {
        super(props);
    }

    render () {

        return(
        <View style={{flex: 1}}>

             <ImageMapper
                       src= 'https://mountainace.blob.core.windows.net/maps/BeaverCreek.jpg'
                       width={width}
                       imageWidth={2391}
                       />

        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
        flexDirection: "column",
        backgroundColor: "#fff"
    },

    circle: {
        width: 150,
        height: 150,
        backgroundColor: "#c00000",
        borderRadius: 100
    },

})

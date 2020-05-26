import React, {Component} from 'react'
import {  View, Dimensions, StyleSheet,Image, ImageBackground } from 'react-native'

import  {PanGestureHandler} from 'react-native-gesture-handler'
const { width, height,  } = Dimensions.get('window')
//It produces slow animation.  Not acceptable.  Need to use Animated somehow
export default class SimpleImage extends Component{
    state={x:0, y:0}
    constructor(props) {
        super(props);
    }
    handleGesture = e => {
        const {nativeEvent} = e;
        console.log(nativeEvent.translationX,nativeEvent.translationY );
        this.setState({x: nativeEvent.translationX, y: nativeEvent.translationY})
    }
    render () {
        console.log(width,height)
        const portW = 760;
        const portH = 1240;
        const {x,y} = this.state;
        const viewBox = `${x} ${y} ${portW} ${portH}`
        console.log(viewBox)
        return(
        <View style={styles.container}>
{/*            <View style={[styles.circle]} />*/}
             <Image  style={styles.image} resizeMode= 'cover' resizeMethod='scale'
                       source= {{ uri:'https://mountainace.blob.core.windows.net/maps/BeaverCreek 7mb.jpg'}}/>
   {/*         <ImageBackground  style={styles.image}
                    source= {{ uri:'https://mountainace.blob.core.windows.net/maps/DeerValley.png'}}/>*/}

        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width:"100%",
        height:"100%"
    },

    circle: {
        width: 30,
        height: 30,
        backgroundColor: "#c00000",
        borderRadius: 20
    },
    image: {
        position:'absolute',
        top: -1400,
        left: -800,
        width: 3586,
        height: 2601,
       // flex:1
    }


})

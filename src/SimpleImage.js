import React, {Component} from 'react'
import {  View, Dimensions, StyleSheet,Image, ImageBackground, Animated  } from 'react-native'

import  {PanGestureHandler} from 'react-native-gesture-handler'
const { width, height,  } = Dimensions.get('window')
//It produces slow animation.  Not acceptable.  Need to use Animated somehow
export default class SimpleImage extends Component{
    state={x:0, y:0}
    translateX = new Animated.Value(0)
    translateY = new Animated.Value(0)

    handleGesture = Animated.event(
        [{nativeEvent: {translationX: this.translateX,translationY:this.translateY}}],
        { useNativeDriver: true,
            listener: (event, gestureState) => console.log(event, gestureState)
        });


    constructor(props) {
        super(props);
    }
   /* handleGesture = e => {
        const {nativeEvent} = e;
        this.translateX = nativeEvent.translationX;
        this.translateY = nativeEvent.translationY;
        console.log(nativeEvent.translationX,nativeEvent.translationY );
    }*/
    render () {
        let
         circleTransformStyle = {
            transform:[
                {
                    translateY : this.translateY
                },
                {
                    translateX : this.translateX
                }
            ]
        }

        console.log(width,height)

        return(
        <View style={styles.container}>
{/*            <View style={[styles.circle]} />*/}
            <PanGestureHandler onGestureEvent={this.handleGesture}>
            <Animated.View style={[circleTransformStyle ]} >
            <Image  style={styles.image} resizeMode= 'cover' resizeMethod='scale'
                       source= {{ uri:'https://mountainace.blob.core.windows.net/maps/deervaley7mb.jpg'}}/>
      {/*  <ImageBackground  style={styles.image}
                    source= {{ uri:'https://mountainace.blob.core.windows.net/maps/deervaley7mb.jpg'}}>

        </ImageBackground>*/}

                <View style={styles.circle } />

            </Animated.View>
            </PanGestureHandler>
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
        position:'absolute',
        top:300,
        left:100,
        width: 30,
        height: 30,
        backgroundColor: "red",
        borderRadius: 20,
        zIndex:2000
    },
    image: {
        position:'absolute',
        top: -100,
        left: -800,
        width: 3586,
        height: 2601,
       // flex:1
    }


})

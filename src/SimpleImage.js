import React, {Component} from 'react'
import {  View, Dimensions, StyleSheet,Image, ImageBackground, Animated  } from 'react-native'

import  {PanGestureHandler, PinchGestureHandler, State} from 'react-native-gesture-handler'
const { width, height,  } = Dimensions.get('window')
//It produces slow animation.  Not acceptable.  Need to use Animated somehow
export default class SimpleImage extends Component{
    x=0;
    y=0;
    k=1;
    circleX = 100;
    circleY = 500;
    panRef = React.createRef();
    pinchRef = React.createRef();
    translateX = new Animated.Value(0)
    translateY = new Animated.Value(0)

    pinchScale  = new Animated.Value(1);
    baseScale = new Animated.Value(1);
    scale = Animated.multiply(this.baseScale, this.pinchScale);

    onPanStateChange = event => {
        if (event.nativeEvent.state === State.ACTIVE) {
            this.x += event.nativeEvent.translationX;
            this.y += event.nativeEvent.translationY;
            this.translateX.setOffset(this.x);
            this.translateX.setValue(0)
            this.translateY.setOffset(this.y);
            this.translateY.setValue(0)
        //    console.log(this.x)
        }

    };
    onPinchStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
           this.k *= event.nativeEvent.scale
           this.baseScale.setValue(this.k);
           this.pinchScale.setValue(1);
          //  console.log(this.k)
        }
        console.log('pinch',event.nativeEvent.state )
    }
    handleGesture = Animated.event(
        [{nativeEvent: {translationX: this.translateX,translationY:this.translateY}}],
        { useNativeDriver: true,
           // listener: (event, gestureState) => console.log(event, gestureState)
        });

    handleZoom = Animated.event(
        [{nativeEvent: {scale: this.pinchScale}}],
        { useNativeDriver: true,
          //  listener: (event, gestureState) => console.log(event, gestureState)
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
                },
                {
                    scale: this.scale
                }
            ]
        }

        return(
        <View style={styles.container}>
            <PinchGestureHandler onGestureEvent={this.handleZoom}
                                 onHandlerStateChange={this.onPinchStateChange}
            >
             <Animated.View style={{flex:1}} collapsable={false}>
                 <PanGestureHandler
                     onGestureEvent={this.handleGesture}
                     onHandlerStateChange={this.onPanStateChange}
                     minDist={30}
                     maxPointers={1}
                 >

                <Animated.View style={[styles.animatedView,circleTransformStyle] } collapsable={false} >
                    <Image  style={[styles.image]} resizeMode= 'cover' resizeMethod='scale'
                       source= {{ uri:'https://mountainace.blob.core.windows.net/maps/deervaley7mb.jpg'}}/>

      {/*  <ImageBackground  style={styles.image}
                    source= {{ uri:'https://mountainace.blob.core.windows.net/maps/deervaley7mb.jpg'}}>

        </ImageBackground>*/}

                    <View style={styles.circle} />
                </Animated.View>
                 </PanGestureHandler>

           </Animated.View>
            </PinchGestureHandler>

        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',

    },

    circle: {
        position:'absolute',
        top:500,
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
    },
    animatedView:{
        flex:1,
        width:"100%",
        height:"100%"
    }


})

import React, {Component} from 'react';
import { View, Dimensions, StyleSheet,Image, ImageBackground, Animated  } from 'react-native';

import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

export default class SimpleImage extends Component{
    constructor(props) {
        super(props);
    }

    _lastScale = 1;
    _baseScale = new Animated.Value(1);
    _pinchScale = new Animated.Value(1);
    _scale = Animated.multiply(this._baseScale, this._pinchScale);

    _animationValueXY = new Animated.ValueXY({ x: 0, y: 0 });
    _lastOffsetX = 0;
    _lastOffsetY = 0;

    _onHandleGesture = event => {
        const x = this.toEqualPanSpeed(event.nativeEvent.translationX)
        const y = this.toEqualPanSpeed(event.nativeEvent.translationY)

        this._animationValueXY.setValue({
            x: x + this._lastOffsetX,
            y: y + this._lastOffsetY
        })
    }

    _onPinchGestureEvent = Animated.event(
        [{ nativeEvent: { scale: this._pinchScale } }],
        { useNativeDriver: true }
    );

    _onHandleGestureState = event => {
        if (event.nativeEvent.state === State.END) {
            const x = this.toEqualPanSpeed(event.nativeEvent.translationX);
            const y = this.toEqualPanSpeed(event.nativeEvent.translationY);

            this._lastOffsetX += x;
            this._lastOffsetY += y;
        }
    }

    _onPinchHandlerStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            this._lastScale *= event.nativeEvent.scale;
            this._baseScale.setValue(this._lastScale);
            this._pinchScale.setValue(1);
        }
    };

    toEqualPanSpeed = (x) => {
        return x / this._scale.__getValue();
    }

    render () {
        const { container } = styles;
        const pinchRef = React.createRef();
        const panRef = React.createRef();

        const viewTransformStyle = {
            transform:[
                {
                    // need scale multiplying for zooming from/to display center
                    translateY : Animated.multiply(this._animationValueXY.y, this._scale)
                },
                {
                    // same for x
                    translateX : Animated.multiply(this._animationValueXY.x, this._scale)
                },
                {
                    scale: this._scale
                },
                {
                    perspective: 200
                }
            ]
        }

        return(
             <PanGestureHandler
                 ref={panRef}
                 simultaneousHandlers={pinchRef}
                 onGestureEvent={this._onHandleGesture}
                 onHandlerStateChange={this._onHandleGestureState}
                 minDist={30}
                 maxPointers={1}
             >
                 <Animated.View style={container} collapsable={false}>
                     <PinchGestureHandler
                         ref={panRef}
                         simultaneousHandlers={panRef}
                         onGestureEvent={this._onPinchGestureEvent}
                         onHandlerStateChange={this._onPinchHandlerStateChange}
                     >
                         <Animated.View style={container} collapsable={false}>
                             <Animated.View style={[styles.animatedView, viewTransformStyle]} collapsable={false} >

                                 <Image
                                     style={[styles.image]}
                                     resizeMode='cover'
                                     resizeMethod='scale'
                                     source= {{ uri:'https://mountainace.blob.core.windows.net/maps/deervaley7mb.jpg'}}
                                 />

                                 <View style={styles.circle} />

                             </Animated.View>
                         </Animated.View>
                     </PinchGestureHandler>
                 </Animated.View>
             </PanGestureHandler>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
        height: 2601
    },
    animatedView:{
        flex:1,
        width:"100%",
        height:"100%"
    }
})

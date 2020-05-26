import React, {Component} from 'react'
import {  View, Dimensions, StyleSheet,Animated } from 'react-native'
import Svg,{Circle,Image} from 'react-native-svg'
import  {PanGestureHandler} from 'react-native-gesture-handler'
const { width, height,  } = Dimensions.get('window')
//It produces slow animation.  Not acceptable.  Need to use Animated somehow
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedImage = Animated.createAnimatedComponent(Image);
export default class ImageGestures extends Component{
    state={x:0,
        y:0,
        newX: new Animated.Value(0),
    }
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        Animated.timing(
            // Animate over time
            this.state.newX,
            {
                toValue: 300,
                duration: 3000,
                delay:1000,
                useNativeDriver: false,
            }
        ).start();
    }
    handleGesture = e => {
        const {nativeEvent} = e;
        console.log(nativeEvent.translationX,nativeEvent.translationY );
        //below is not the right way
        //this.setState({x: -1*nativeEvent.translationX, y: -1*nativeEvent.translationY})
    }
    viewBox = ( x,y,w,h) => ( x.toString()+ ' ' + y.toString() + ' ' + w.toString() + ' ' + h.toString() )
    render () {
        const {x,y, newX } = this.state;
       /* let newX = initAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 200],
        });*/
        console.log(newX)
        const portW = 760;
        const portH = 1240;

       // const viewBox = `${x} ${y} ${portW} ${portH}`
       // console.log(viewBox)
        return(
        <View style={{flex: 1}}>
            <PanGestureHandler onGestureEvent ={this.handleGesture}>
            <AnimatedSvg width={width}
                 height={height}
                 viewBox={this.viewBox(x,y,portW, portH)}>
                <AnimatedImage x={newX} y={0} width={1360} height={2640} preserveAspectRatio="xMidYMid slice"
                       href={{uri: 'https://mountainace.blob.core.windows.net/maps/BeaverCreek.jpg'}}/>
                <Circle cx={150} cy={150} r={30} fill='red'/>
            </AnimatedSvg>
            </PanGestureHandler>
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

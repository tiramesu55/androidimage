import React from 'react'
import {  View, Dimensions } from 'react-native'
import {Svg,Circle,Image} from 'react-native-svg'
const { width, height,  } = Dimensions.get('window')

const ImageGestures = () => {
    console.log(width,height)
    return (
        <View style={{ flex: 1}}>
           <Svg width={width}
                height={height}
                viewBox='0 0 960 1640'>
               <Image x={0} y={0} width={1360} height={2640} preserveAspectRatio="xMidYMid slice"
                      href={{uri: 'https://mountainace.blob.core.windows.net/maps/BeaverCreek.jpg'}} />
                <Circle cx={150} cy={150} r={30} fill='red'/>
           </Svg>
        </View>
    )
}

export default ImageGestures

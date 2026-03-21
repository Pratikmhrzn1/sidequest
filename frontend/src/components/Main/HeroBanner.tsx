import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
 
interface Props {
  text:         string;
  animationKey: number;
  r:            (s: number, m: number, l: number) => number;
}
 
export function HeroBanner({ text, animationKey, r }: Props) {
  return (
    <>
      {/* Animated journey text */}
      <Animatable.Text
        key={animationKey}
        animation="fadeInLeft"
        duration={800}
        style={[
          styles.journeyText,
          { fontSize: r(20, 23, 30), marginBottom: r(16, 20, 24) },
        ]}>
        {text}
      </Animatable.Text>
 
      {/* Aeroplane image */}
      <View style={[styles.imageBox, {
        padding:      r(16, 20, 24),
        borderRadius: r(8, 10, 12),
      }]}>
        <Image
          source={require('../../assets/images/aeroplane.png')}
          style={{
            width:     r(250, 300, 350),
            height:    r(140, 170, 200),
            alignSelf: 'center',
          }}
          resizeMode="contain"
        />
      </View>
    </>
  );
}
 
const styles = StyleSheet.create({
  journeyText: { fontWeight: '700' },
  imageBox:    { backgroundColor: 'skyblue', justifyContent: 'center' },
});
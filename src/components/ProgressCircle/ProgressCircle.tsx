import React from 'react'
import { StyleSheet, View } from 'react-native'

interface Props {
  backgroundColor?: string
  borderWidth?: number
  children?: React.ReactNode
  color?: string
  innerColor?: string
  percent?: number
  radius: number
}

export default function ProgressCircle({
  backgroundColor = '#eee',
  borderWidth = 1,
  children,
  color = '#333',
  innerColor = '#fff',
  percent = 0,
  radius,
}: Props) {
  const diameter = 2 * radius
  return (
    <View
      style={[
        styles.circle,
        {
          backgroundColor,
          borderRadius: radius,
          height: diameter,
          width: diameter,
        },
      ]}
    >
      <View style={[styles.leftWrap, { height: diameter, left: 0, width: radius }]}>
        <View
          style={[
            styles.loader,
            {
              backgroundColor: color,
              borderBottomLeftRadius: 0,
              borderTopLeftRadius: 0,
              height: diameter,
              left: radius,
              transform: [
                { translateX: -radius / 2 },
                { rotate: `${percent >= 50 ? (percent - 50) * 3.6 : 0}deg` },
                { translateX: radius / 2 },
              ],
              width: radius,
            },
          ]}
        />
      </View>
      <View style={[styles.leftWrap, { height: diameter, left: radius, width: radius }]}>
        <View
          style={[
            styles.loader,
            {
              backgroundColor: color,
              borderBottomRightRadius: 0,
              borderTopRightRadius: 0,
              height: diameter,
              left: -radius,
              transform: [
                { translateX: radius / 2 },
                { rotateZ: `${percent >= 50 ? 180 : percent * 3.6}deg` },
                { translateX: -radius / 2 },
              ],
              width: radius,
            },
          ]}
        />
      </View>
      <View
        style={[
          styles.innerCircle,
          {
            backgroundColor: innerColor,
            borderRadius: radius - borderWidth,
            height: (radius - borderWidth) * 2,
            width: (radius - borderWidth) * 2,
          },
        ]}
      >
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  innerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    zIndex: 2,
  },
  leftWrap: {
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  loader: {
    borderRadius: 1000,
    left: 0,
    position: 'absolute',
    top: 0,
  },
  rightWrap: {
    position: 'absolute',
  },
})

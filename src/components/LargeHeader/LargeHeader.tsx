import { StackActions } from '@react-navigation/native'
import { BackIcon, WhiteLogo } from 'assets/images'
import React, { useEffect, useState } from 'react'
import { BackHandler, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

import styles from './LargeHeader.styles'

type Props = {
  circleImage: SVGElement
  circleImageStyle: ViewStyle
  backgroundColor: Colors
  navigation: any
}

const LargeHeader = ({ circleImage, circleImageStyle, backgroundColor, navigation }: Props) => {
  const [style, setStyle] = useState<ViewStyle>(styles.container)

  useEffect(() => {
    const backgroundColorStyle = backgroundColor ? { backgroundColor: colors[backgroundColor] } : {}
    setStyle(StyleSheet.flatten([backgroundColorStyle, styles.container]))
  }, [backgroundColor])

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      goBack()
      return true
    })
    return () => backHandler.remove()
  }, [])

  const goBack = () => {
    navigation.dispatch(StackActions.pop(1))
  }

  return (
    <View style={style}>
      <TouchableOpacity style={styles.backIcon} onPress={goBack}>
        <BackIcon />
      </TouchableOpacity>
      <View style={styles.logo}>
        <WhiteLogo />
      </View>
      <View style={circleImageStyle}>{circleImage}</View>
    </View>
  )
}

export default LargeHeader

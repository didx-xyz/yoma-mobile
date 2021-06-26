import { StackActions } from '@react-navigation/native'
import { BackIcon, WhiteLogo } from 'assets/images'
import React, { useEffect, useState, ReactElement } from 'react'
import { BackHandler, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import { Colors, colors } from 'styles'

import styles from './LargeHeader.styles'

// TODO: refactor to use correct typing
const onNavigationBack = (navigation: any) => {
  navigation.dispatch(StackActions.pop(1))
}

type Props = {
  circleImage: ReactElement
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
      onNavigationBack(navigation)
      return true
    })
    return () => backHandler.remove()
  }, [navigation])

  return (
    <View style={style}>
      <TouchableOpacity style={styles.backIcon} onPress={onNavigationBack}>
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

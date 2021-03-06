import React, { ReactElement, useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'

import { BackIcon, WhiteLogo } from '~/assets/images'
import { Colors, colors } from '~/styles'

import styles from './HeaderLarge.styles'

type Props = {
  circleImage: ReactElement
  circleImageStyle: ViewStyle
  backgroundColor: Colors
  navigation: any
}

const HeaderLarge = ({ circleImage, circleImageStyle, backgroundColor, navigation }: Props) => {
  const [style, setStyle] = useState<ViewStyle>(styles.container)

  useEffect(() => {
    const backgroundColorStyle = backgroundColor ? { backgroundColor: colors[backgroundColor] } : {}
    setStyle(StyleSheet.flatten([backgroundColorStyle, styles.container]))
  }, [backgroundColor])

  return (
    <View style={style}>
      <TouchableOpacity style={styles.backIcon} onPress={navigation.goBack}>
        <BackIcon />
      </TouchableOpacity>
      <View style={styles.logo}>
        <WhiteLogo />
      </View>
      <View style={circleImageStyle}>{circleImage}</View>
    </View>
  )
}

export default HeaderLarge

import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'

import { colors, Colors } from '../../styles'
import { WithChildren } from '../../types/react.types'
import styles from './Background.styles'

type Props = WithChildren<{
  color?: Colors
}>
const Background = ({ color = Colors.PrimaryYellow, children }: Props) => {
  const [style, setStyle] = useState<ViewStyle>(styles.container)

  useEffect(() => {
    const backgroundColorStyle = color ? { backgroundColor: colors[color] } : {}
    setStyle(StyleSheet.flatten([backgroundColorStyle, styles.container]))
  }, [color])

  return <View style={style}>{children}</View>
}

export default Background

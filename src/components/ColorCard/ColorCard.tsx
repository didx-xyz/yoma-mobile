import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'
import { WithChildren } from 'types/react.types'

import styles from './ColorCard.styles'

type Props = WithChildren<{
  backgroundColor?: Colors
  style?: ViewStyle
}>

const ColorCard = ({ children, backgroundColor, style, ...props }: Props) => {
  const [viewStyles, setViewStyles] = useState<ViewStyle>({})

  useEffect(() => {
    const colorStyle = backgroundColor
      ? { backgroundColor: colors[backgroundColor] }
      : { backgroundColor: colors[Colors.white] }
    setViewStyles(StyleSheet.flatten([styles.container, colorStyle, style]))
  }, [backgroundColor, style])

  return (
    <View style={viewStyles} {...props}>
      {children}
    </View>
  )
}

export default ColorCard

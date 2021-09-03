import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'
import { WithChildren } from 'types/react.types'

import styles from './Card.styles'

type Props = WithChildren<{
  backgroundColor?: Colors
  style?: ViewStyle
}>

const Card = ({ children, backgroundColor = Colors.White, style }: Props) => {
  const [viewStyles, setViewStyles] = useState<ViewStyle>({})

  useEffect(() => {
    const colorStyle = { backgroundColor: colors[backgroundColor] }
    setViewStyles(StyleSheet.flatten([styles.container, colorStyle, style]))
  }, [backgroundColor, style])

  return <View style={viewStyles}>{children}</View>
}

export default Card

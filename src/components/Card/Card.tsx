import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'

import { Colors, colors } from '~/styles'
import * as ReactTypes from '~/types/react.types'

import styles from './Card.styles'

type Props = ReactTypes.WithChildren<{
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

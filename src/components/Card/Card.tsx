import React, { useMemo } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'

import { Colors, colors } from '~/styles'
import * as ReactTypes from '~/types/react.types'

import { CORNERS_MAP } from './Card.constants'
import styles from './Card.styles'

type Props = ReactTypes.WithChildren<{
  backgroundColor?: Colors
  style?: ViewStyle
  corners?: 'bubble' | 'round' | 'square'
}>

const Card = ({ children, backgroundColor = Colors.White, corners = 'round', style }: Props) => {
  const viewStyles = useMemo(() => {
    const colorStyle = { backgroundColor: colors[backgroundColor] }
    const cornersStyle = { borderRadius: CORNERS_MAP[corners] }
    return StyleSheet.flatten([styles.container, colorStyle, cornersStyle, style])
  }, [backgroundColor, corners, style])

  return <View style={viewStyles}>{children}</View>
}

export default Card

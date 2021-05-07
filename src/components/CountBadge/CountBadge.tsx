import Text, { HeaderLevels } from 'components/Typography'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'
import { applyAlphaToHex } from 'styles/styles.utils'

import styles from './CountBadge.styles'

type Props = {
  count: number
  color: Colors
}

const CountBadge = ({ count, color }: Props) => {
  const [style, setStyle] = useState<ViewStyle>(styles.container)

  useEffect(() => {
    const backgroundColorStyle = { backgroundColor: applyAlphaToHex(colors[color])(0.1) }
    setStyle(StyleSheet.flatten([styles.container, backgroundColorStyle]))
  }, [color])

  return (
    <View style={style}>
      <Text.Header level={HeaderLevels.h6} color={Colors.primaryBlue}>
        {count}
      </Text.Header>
    </View>
  )
}

export default CountBadge

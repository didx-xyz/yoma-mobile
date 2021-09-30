import React from 'react'
import { View } from 'react-native'

import Text, { BodyLevels, FontWeights } from '~/components/Typography'
import { Colors, colors } from '~/styles'
import { applyAlphaToHex } from '~/styles/styles.utils'

import styles from './CountBadge.styles'

type Props = {
  count: number
  color: Colors
}

const CountBadge = ({ count, color }: Props) => {
  return (
    <View style={[styles.container, { backgroundColor: applyAlphaToHex(colors[color])(0.1) }]}>
      <Text.Body level={BodyLevels.Small} weight={FontWeights.Bold700} color={color}>
        {count}
      </Text.Body>
    </View>
  )
}

export default CountBadge

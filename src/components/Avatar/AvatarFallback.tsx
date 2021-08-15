import React from 'react'
import { View } from 'react-native'

import { Colors } from '../../styles'
import Text, { HeaderLevels } from '../Typography'
import styles from './Avatar.styles'

interface AvatarFallbackProps {
  char: string
}
export const AvatarFallback = ({ char }: AvatarFallbackProps) => (
  <View style={styles.container}>
    <Text.Header level={HeaderLevels.h3} color={Colors.primaryDarkGrey}>
      {char}
    </Text.Header>
  </View>
)

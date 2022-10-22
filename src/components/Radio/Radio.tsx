import React from 'react'
import { View } from 'react-native'

import styles from './Radio.styles'

interface Props {
  isSelected: boolean
}
const Radio = ({ isSelected }: Props) => (
  <View style={styles.container}>{isSelected && <View style={styles.selected} />}</View>
)

export default Radio

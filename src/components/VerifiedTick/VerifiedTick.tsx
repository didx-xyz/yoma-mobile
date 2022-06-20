import React from 'react'
import { View } from 'react-native'

import Tick from '~/assets/images/tick.svg'

import styles from './VerifiedTick.styles'

const VerifiedTick = () => (
  <View style={styles.container}>
    <Tick />
  </View>
)

export default VerifiedTick

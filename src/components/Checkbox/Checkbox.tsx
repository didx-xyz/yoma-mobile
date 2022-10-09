import React from 'react'
import { View } from 'react-native'

import { BlueHollowCircle, BlueTick } from '~/assets/images'
import Optional from '~/components/Optional'

import styles from './Checkbox.styles'

interface Props {
  isSelected: boolean
}

const Checkbox = ({ isSelected }: Props) => (
  <View style={styles.container}>
    <Optional condition={isSelected} fallback={<BlueHollowCircle />}>
      <View style={styles.selected}>
        <BlueTick />
      </View>
    </Optional>
  </View>
)

export default Checkbox

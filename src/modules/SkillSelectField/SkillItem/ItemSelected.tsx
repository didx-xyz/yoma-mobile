import React from 'react'
import { View } from 'react-native'

import { BlueTick } from '~/assets/images'

import styles from './ItemSelected.styles'

interface Props {
  isSelected: boolean
}

const ItemSelected = ({ isSelected }: Props) => {
  if (isSelected) {
    return <View style={styles.empty} />
  }

  return (
    <View style={styles.selected}>
      <BlueTick />
    </View>
  )
}

export default ItemSelected

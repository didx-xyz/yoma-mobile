import React from 'react'
import { View } from 'react-native'

import { Colors } from '~/styles'
import { FCWithChildren } from '~/types/react.types'

import Button from '../Button'
import { ButtonVariants } from '../Button.types'
import styles from './ButtonWithBadge.styles'

interface Props extends FCWithChildren {
  onPress: () => void
  label: string
  isDisabled?: boolean
}
const ButtonWithBadge = ({ children, onPress, label, isDisabled = false }: Props) => {
  return (
    <Button
      variant={ButtonVariants.Clear}
      label={label}
      color={Colors.PrimaryGreen}
      onPress={onPress}
      style={styles.button}
      isFullWidth={false}
      isDisabled={isDisabled}
    >
      <View style={styles.badge}>{children}</View>
    </Button>
  )
}

export default ButtonWithBadge

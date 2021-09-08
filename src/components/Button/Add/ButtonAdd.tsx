import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import { AddIcon } from '../../../assets/images'
import { Colors } from '../../../styles'
import Button from '../Button'
import { ButtonVariants } from '../Button.types'
import styles from './ButtonAdd.styles'

interface Props {
  onPress: () => void
  isDisabled?: boolean
}
const ButtonAdd = ({ onPress, isDisabled = false }: Props) => {
  const { t } = useTranslation()

  return (
    <Button
      variant={ButtonVariants.Clear}
      label={t('Add')}
      color={Colors.PrimaryGreen}
      onPress={onPress}
      style={styles.button}
      isFullWidth={false}
      isDisabled={isDisabled}
    >
      <View style={styles.badge}>
        <AddIcon />
      </View>
    </Button>
  )
}

export default ButtonAdd

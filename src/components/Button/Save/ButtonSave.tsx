import React from 'react'
import { useTranslation } from 'react-i18next'

import { Colors } from '../../../styles'
import { ButtonVariants } from '../Button.types'
import Button from '../index'
import styles from './ButtonSave.styles'

interface Props {
  onPress: () => void
  isDisabled: boolean
}
const ButtonSave = ({ onPress, isDisabled }: Props) => {
  const { t } = useTranslation()

  return (
    <Button
      isDisabled={isDisabled}
      variant={ButtonVariants.Clear}
      label={t('Save')}
      color={Colors.PrimaryGreen}
      onPress={onPress}
      style={styles.button}
      isFullWidth={false}
    />
  )
}

export default ButtonSave

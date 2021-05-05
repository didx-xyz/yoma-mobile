import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import Button, { ButtonVariants } from '../Button'
import { MAP_VARIANT_TO_OPTIONS } from './SocialButton.constants'
import { SocialVariants } from './SocialButton.types'
import styles from './SocialButtons.styles'

interface Props {
  variant: SocialVariants
  onPress: () => void
}

const SocialButton = ({ onPress, variant }: Props) => {
  const { t } = useTranslation()

  return (
    <Button
      variant={ButtonVariants.Clear}
      onPress={onPress}
      color={MAP_VARIANT_TO_OPTIONS[variant].color}
      style={styles[variant]}
      label={t(MAP_VARIANT_TO_OPTIONS[variant].translationKey)}
    >
      <View style={styles.iconWrapper}>{MAP_VARIANT_TO_OPTIONS[variant].icon}</View>
    </Button>
  )
}

export default SocialButton

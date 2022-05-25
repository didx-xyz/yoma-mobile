import React from 'react'
import { useTranslation } from 'react-i18next'

import { EditIcon } from '~/assets/images'

import ButtonWithBadge from '../WithBadge'

interface Props {
  onPress: () => void
  isDisabled?: boolean
}
const ButtonEdit = ({ onPress, isDisabled = false }: Props) => {
  const { t } = useTranslation()
  return (
    <ButtonWithBadge onPress={onPress} label={t('Edit')} isDisabled={isDisabled}>
      {<EditIcon />}
    </ButtonWithBadge>
  )
}

export default ButtonEdit

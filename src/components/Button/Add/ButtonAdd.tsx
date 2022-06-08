import React from 'react'
import { useTranslation } from 'react-i18next'

import { AddIcon } from '~/assets/images'

import ButtonWithBadge from '../WithBadge'

interface Props {
  onPress: () => void
  isDisabled?: boolean
}
const ButtonAdd = ({ onPress, isDisabled = false }: Props) => {
  const { t } = useTranslation()
  return (
    <ButtonWithBadge onPress={onPress} label={t('Add')} isDisabled={isDisabled}>
      {<AddIcon />}
    </ButtonWithBadge>
  )
}

export default ButtonAdd

import React from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator } from 'react-native'

import Spacer from '~/components/Spacer'
import { Stack } from '~/components/Stack'
import Text, { HeaderLevels, TextAlign } from '~/components/Typography'
import { Colors } from '~/styles'

interface Props {
  isLoading: boolean
  hasNoResult: boolean
}

const NoSkillsStates = ({ isLoading, hasNoResult }: Props) => {
  const { t } = useTranslation()
  if (isLoading) {
    return (
      <>
        <Spacer height={20} />
        <ActivityIndicator size="large" />
      </>
    )
  }

  if (hasNoResult) {
    return (
      <Stack>
        <Text.Header level={HeaderLevels.H4} align={TextAlign.Center}>
          {t('No matching skills found')}
        </Text.Header>
      </Stack>
    )
  }

  return (
    <Text.Body align={TextAlign.Center} color={Colors.MenuGrey}>
      {t('Type to begin searching')}
    </Text.Body>
  )
}

export default NoSkillsStates

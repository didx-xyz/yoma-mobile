import React from 'react'
import { useTranslation } from 'react-i18next'

import { Stack } from '~/components/Stack'
import Text, { HeaderLevels, TextAlign } from '~/components/Typography'
import { Colors } from '~/styles'

interface Props {
  hasNoResult: boolean
}

const NoSkillsStates = ({ hasNoResult }: Props) => {
  const { t } = useTranslation()

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

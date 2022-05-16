import { debounce } from 'lodash'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { TextInput } from 'react-native'

import { Stack } from '~/components/Stack'

import styles from './SkillsFilter.styles'

interface Props {
  setSearchTerm: (term: string) => void
  setIsLoading: (state: boolean) => void
}

const SkillsFilter = ({ setSearchTerm, setIsLoading }: Props) => {
  const { t } = useTranslation()
  const onTextInput = useCallback(() => {
    setIsLoading(true)
  }, [setIsLoading])

  return (
    <Stack styles={styles.container}>
      <TextInput
        onTextInput={onTextInput}
        onChangeText={debounce(setSearchTerm, 750)}
        placeholder={t('Enter skill names')}
        style={styles.filterInput}
      />
    </Stack>
  )
}

export default SkillsFilter

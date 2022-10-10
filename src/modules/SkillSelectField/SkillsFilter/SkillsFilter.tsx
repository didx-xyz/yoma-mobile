import { debounce } from 'lodash'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { TextInput } from 'react-native'

import { Stack } from '~/components/Stack'

import styles from './SkillsFilter.styles'

interface Props {
  searchPlaceholder?: string
  setSearchTerm: (term: string) => void
  setIsLoading: (state: boolean) => void
}

const SkillsFilter = ({ searchPlaceholder, setSearchTerm, setIsLoading }: Props) => {
  const { t } = useTranslation()
  const onTextInput = useCallback(() => {
    setIsLoading(true)
  }, [setIsLoading])

  return (
    <Stack style={styles.container}>
      <TextInput
        onTextInput={onTextInput}
        onChangeText={debounce(setSearchTerm, 750)}
        placeholder={searchPlaceholder || t('Enter skill names')}
        style={styles.filterInput}
      />
    </Stack>
  )
}

export default SkillsFilter

import { debounce } from 'lodash'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { TextInput } from 'react-native'

import { Stack } from '~/components/Stack'

import styles from './ListFilter.styles'

interface Props {
  setSearchTerm: (term: string) => void
  searchPlaceholder?: string
  setIsLoading?: (state: boolean) => void
}

const ListFilter = ({ setSearchTerm, setIsLoading, searchPlaceholder }: Props) => {
  const { t } = useTranslation()
  const onTextInput = useCallback(() => {
    setIsLoading?.(true)
  }, [setIsLoading])

  return (
    <Stack styles={styles.container}>
      <TextInput
        onTextInput={onTextInput}
        onChangeText={debounce(setSearchTerm, 750)}
        placeholder={searchPlaceholder || t('Search')}
        style={styles.filterInput}
      />
    </Stack>
  )
}

export default ListFilter

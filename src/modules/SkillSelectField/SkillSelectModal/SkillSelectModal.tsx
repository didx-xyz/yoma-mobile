import { debounce } from 'lodash'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, FlatList, TextInput } from 'react-native'

import Divider from '~/components/Divider'
import Modal from '~/components/Modal/Modal'
import Optional from '~/components/Optional'
import { Stack } from '~/components/Stack'
import Text, { HeaderLevels, TextAlign } from '~/components/Typography'
import SkillItem from '~/modules/SkillSelectField/SkillItem'
import { useSkillsFilter } from '~/modules/SkillSelectField/SkillSelectField.hooks'
import { Colors } from '~/styles'

import styles from './SkillSelectModal.styles'

interface Props {
  isModalOpen: boolean
  handleItemSelect: (skill: string) => void
  skills: string[]
}

const SkillSelectModal = ({ isModalOpen, handleItemSelect, skills }: Props) => {
  const { t } = useTranslation()
  const { isLoading, setIsLoading, results: filteredSkills, searchTerm, setSearchTerm } = useSkillsFilter(skills)

  const handleClose = useCallback(() => {
    setSearchTerm('')
  }, [setSearchTerm])

  const renderItem = useCallback(
    ({ item }) => <SkillItem item={item} onPress={() => handleItemSelect(item)} />,
    [handleItemSelect],
  )

  const onTextInput = useCallback(() => {
    if (!isLoading) {
      setIsLoading(true)
    }
  }, [isLoading, setIsLoading])

  return (
    <Modal onClose={handleClose} isVisible={isModalOpen}>
      <Stack styles={{ overflow: 'hidden' }}>
        <Stack styles={styles.header}>
          <TextInput
            onTextInput={onTextInput}
            onChangeText={debounce(setSearchTerm, 500, { maxWait: 1000 })}
            placeholder={t('Enter skill names')}
            style={styles.filterInput}
          />
          <Optional condition={isLoading}>
            <ActivityIndicator style={styles.loader} />
          </Optional>
        </Stack>
        <FlatList
          ItemSeparatorComponent={() => <Divider />}
          data={filteredSkills}
          ListEmptyComponent={
            <Optional
              condition={searchTerm !== ''}
              fallback={
                <Text.Body align={TextAlign.Center} color={Colors.MenuGrey}>
                  {t('Type to begin searching')}
                </Text.Body>
              }
            >
              <Stack>
                <Text.Header level={HeaderLevels.H4} align={TextAlign.Center}>
                  {t('No matching skills found')}
                </Text.Header>
              </Stack>
            </Optional>
          }
          renderItem={renderItem}
        />
      </Stack>
    </Modal>
  )
}
export default SkillSelectModal

import { useField } from 'formik'
import { concat, of, pipe, uniq } from 'ramda'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, FlatList, Modal, Pressable, StyleSheet, TextInput, View, ViewStyle } from 'react-native'

import Divider from '~/components/Divider'
import Optional from '~/components/Optional'
import Text, { FontWeights, HeaderLevels, TextAlign } from '~/components/Typography'
import { Colors, colors } from '~/styles'
import { dropElement } from '~/utils/arrays.utils'

import { useSkillsFilter } from './SkillSelectField.hooks'
import styles from './SkillSelectField.styles'
import SkillsInput from './SkillsInput'

const buttonDoneStyles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    marginRight: 10,
    padding: 10,
  } as ViewStyle,
})
interface ButtonDoneProps {
  onPress: () => void
}
const ButtonDone = ({ onPress }: ButtonDoneProps) => {
  const { t } = useTranslation()
  return (
    <Pressable onPress={onPress} style={buttonDoneStyles.container}>
      <Text.Body align={TextAlign.Center} weight={FontWeights.Bold700} color={Colors.PrimaryGreen}>
        {t('Done')}
      </Text.Body>
    </Pressable>
  )
}

const itemStyles = StyleSheet.create({
  container: {
    backgroundColor: colors[Colors.LightGrey],
    paddingVertical: 20,
    paddingHorizontal: 10,
  } as ViewStyle,
})
interface ItemProps {
  item: string
  onPress: () => void
}
const Item = ({ item, onPress }: ItemProps) => {
  const [isSelected, setIsSelected] = useState(false)

  const handleOnPress = useCallback(() => {
    setIsSelected(true)
    onPress()
  }, [onPress])
  return (
    <Pressable key={item} onPress={handleOnPress} style={itemStyles.container}>
      <Text.Body>{item}</Text.Body>
      {isSelected && <Text.Body>Selected</Text.Body>}
    </Pressable>
  )
}

interface Props {
  name: string
  skills: string[]
}
const SkillsSelectField = ({ name, skills }: Props) => {
  const [{ value }, { touched, error }, { setValue }] = useField(name)
  const { filteredSkills, searchTerm, isBusy, setSearchTerm } = useSkillsFilter(skills)
  const [isModalOpen, setToggleModal] = useState(false)
  const { t } = useTranslation()

  const handleItemSelect = useCallback(
    (skill: string) => {
      const selectedSkills = pipe(of, concat(value), uniq)(skill)
      setValue(selectedSkills)
    },
    [setValue, value],
  )

  const handleDelete = useCallback(
    skill => {
      const selectedSkills = dropElement(skill)(value)
      setValue(selectedSkills)
    },
    [setValue, value],
  )

  const openModal = () => setToggleModal(true)

  return (
    <>
      <SkillsInput skills={value} touched={touched} error={error} onDelete={handleDelete} onAdd={openModal} />
      <Modal visible={isModalOpen} transparent animationType={'fade'} hardwareAccelerated statusBarTranslucent>
        <View style={styles.modalOverlay} />
        <View style={styles.modal}>
          <ButtonDone
            onPress={() => {
              setToggleModal(false)
              setSearchTerm('')
            }}
          />
          <FlatList
            ListHeaderComponent={
              <TextInput
                onChangeText={setSearchTerm}
                placeholder={t('Start typing to view suggestions')}
                style={styles.filterInput}
              />
            }
            ItemSeparatorComponent={() => <Divider />}
            data={filteredSkills}
            ListEmptyComponent={
              <Optional
                condition={isBusy}
                fallback={
                  <Optional condition={searchTerm !== ''}>
                    <Text.Header level={HeaderLevels.H2}>{t('No Results for Search Term')}</Text.Header>
                  </Optional>
                }
              >
                <ActivityIndicator size={'large'} />
              </Optional>
            }
            renderItem={({ item }) => <Item item={item} onPress={() => handleItemSelect(item)} />}
          />
        </View>
      </Modal>
    </>
  )
}

export default SkillsSelectField

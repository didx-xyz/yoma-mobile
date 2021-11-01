import { useField } from 'formik'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, Modal, Pressable, TextInput, View } from 'react-native'

import Button from '~/components/Button'
import Text, { HeaderLevels } from '~/components/Typography'

import { useSkillsFilter } from './SkillSelectField.hooks'

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
    <Pressable
      key={item}
      onPress={handleOnPress}
      style={{ backgroundColor: '#f5f5f5', paddingVertical: 20, paddingHorizontal: 10 }}
    >
      <Text.Body>{item}</Text.Body>
      {isSelected && <Text.Body>Selected</Text.Body>}
    </Pressable>
  )
}

interface Props {
  name: string
  skills: string[]
}
const SkillsSelectorField = ({ name, skills }: Props) => {
  const [{ value }, { touched, error }, { setValue }] = useField(name)
  const { filteredSkills, setSearchTerm } = useSkillsFilter(skills)
  const [isModalOpen, setToggleModal] = useState(false)

  useEffect(() => {
    console.log({ value })
  }, [value])

  const onItemSelect = useCallback(
    (skill: string) => {
      setValue([...value, skill])
    },
    [setValue, value],
  )

  return (
    <>
      <Button label="Select Skills" onPress={() => setToggleModal(true)} />
      {error && touched && <Text.Body>{error}</Text.Body>}
      <Modal visible={isModalOpen}>
        <Button label={'Close'} onPress={() => setToggleModal(false)} />
        <FlatList
          ListHeaderComponent={
            <TextInput
              onChangeText={setSearchTerm}
              placeholder="Filter skills"
              style={{ borderWidth: 1, backgroundColor: '#f5f5f5', padding: 10, margin: 10 }}
            />
          }
          ItemSeparatorComponent={() => <View style={{ borderBottomWidth: 1, borderBottomColor: '#999' }} />}
          data={filteredSkills}
          ListEmptyComponent={<Text.Header level={HeaderLevels.H2}>No Results for Search Term</Text.Header>}
          renderItem={({ item }) => <Item item={item} onPress={() => onItemSelect(item)} />}
        />
      </Modal>
    </>
  )
}

export default SkillsSelectorField

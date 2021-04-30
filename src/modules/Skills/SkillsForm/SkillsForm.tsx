import { Card, Optional, Tag } from 'components'
import Text from 'components/Typography'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, TouchableOpacity, View } from 'react-native'
import Autocomplete from 'react-native-autocomplete-input'

import { FILTERED_SKILLS_DEFAULT, MOCK_SKILLS_LIST, SELECTED_VALUE_DEFAULT } from './SkillsForm.constants'
import styles from './SkillsForm.styles'
import { deleteSkill, findSkill } from './SkillsForm.utils'

const SkillsForm = () => {
  const { t } = useTranslation()
  const [skillsList, setSkills] = useState<string[]>(MOCK_SKILLS_LIST)
  const [filteredSkills, setFilteredSkills] = useState<string[]>(FILTERED_SKILLS_DEFAULT)
  const [selectedValue, setSelectedValue] = useState(SELECTED_VALUE_DEFAULT)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const deleteTag = (skill: string) => {
    setSelectedSkills(deleteSkill(selectedSkills, skill))
  }

  return (
    <View style={styles.container}>
      <Card style={styles.inner}>
        <Text.Meta>{t('Skills Developed')}</Text.Meta>
        <Optional condition={skillsList.length > 0}>
          <FlatList
            data={selectedSkills}
            renderItem={({ item }) => <Tag tag={item} onDeleteSkill={deleteTag} />}
            keyExtractor={index => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </Optional>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteInputContainer}
          data={filteredSkills}
          defaultValue={selectedValue ?? ''}
          onChangeText={text => setFilteredSkills(findSkill(skillsList, text))}
          placeholder="Enter the skill"
          flatListProps={{
            renderItem: ({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedValue(item)
                  setSelectedSkills([...selectedSkills, item])
                  setFilteredSkills(FILTERED_SKILLS_DEFAULT)
                  setSelectedValue(SELECTED_VALUE_DEFAULT)
                }}
              >
                <Text.Body>{item}</Text.Body>
              </TouchableOpacity>
            ),
            keyExtractor: index => index.toString(),
          }}
          inputContainerStyle={styles.inputContainer}
        />
      </Card>
    </View>
  )
}

export default SkillsForm

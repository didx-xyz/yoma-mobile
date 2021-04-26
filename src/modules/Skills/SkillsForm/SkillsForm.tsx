import { CrossIcon } from 'assets/images'
import { Card, Optional } from 'components'
import Text from 'components/Typography'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, TouchableOpacity, View } from 'react-native'
import Autocomplete from 'react-native-autocomplete-input'
import { Colors } from 'styles'

import { FILTERED_SKILLS_DEFAULT, SELECTED_VALUE_DEFAULT } from './SkillsForm.constants'
import styles from './SkillsForm.styles'

const SkillsForm = () => {
  const { t } = useTranslation()
  // TODO:adding static skills for UI handling
  const [skillsList, setSkills] = useState<string[]>(['Software Engineering', 'figma', 'UI', 'UX', 'Design'])
  // For Filtered Data
  const [filteredSkills, setFilteredSkills] = useState<string[]>(FILTERED_SKILLS_DEFAULT)
  // For Selected Data
  const [selectedValue, setSelectedValue] = useState(SELECTED_VALUE_DEFAULT)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const findSkill = (query: string) => {
    // Method called every time when we change the value of the input
    if (query) {
      // Making a case insensitive regular expression
      const regex = new RegExp(query.trim(), 'i')
      // Setting the filtered skill array according the query
      setFilteredSkills(skillsList.filter(skill => skill.search(regex) >= 0))
    } else {
      // If the query is null then return blank
      setFilteredSkills(FILTERED_SKILLS_DEFAULT)
    }
  }

  const rendertags = (tag: string) => {
    return (
      <View style={styles.tag}>
        <TouchableOpacity style={styles.crossIcon}>
          <CrossIcon height={15} width={15} />
        </TouchableOpacity>
        <Text.Body color={Colors.primaryBlue}>{tag}</Text.Body>
      </View>
    )
  }

  return (
    <View style={styles.outerContainer}>
      <Card style={styles.innerContainer}>
        <Text.Meta>{t('Skills Developed')}</Text.Meta>
        <Optional condition={skillsList.length > 0}>
          <FlatList
            data={selectedSkills}
            renderItem={({ item }) => rendertags(item)}
            keyExtractor={index => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </Optional>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          data={filteredSkills}
          defaultValue={selectedValue ?? ''}
          onChangeText={text => findSkill(text)}
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
          inputContainerStyle={styles.inputContainerStyle}
        />
      </Card>
    </View>
  )
}

export default SkillsForm

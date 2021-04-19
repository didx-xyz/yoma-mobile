import { CrossIcon } from 'assets/images'
import Text from 'components/Typography'
import React, { useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import Autocomplete from 'react-native-autocomplete-input'
import { colors, Colors } from 'styles'

import styles from './Skills.styles'

const SkillsForm = () => {
  // TODO:adding static skills for UI handling
  const [skillsList, setSkills] = useState<string[]>(['Software Engineering', 'figma', 'UI', 'UX', 'Design'])
  // For Filtered Data
  const [filteredSkills, setFilteredSkills] = useState<string[]>([])
  // For Selected Data
  const [selectedValue, setSelectedValue] = useState('')
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
      setFilteredSkills([])
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
    <View style={{ height: 500 }}>
      <View style={styles.container}>
        <View>
          {skillsList.length > 0 ? (
            <>
              <Text.Meta>Skills Developed</Text.Meta>
              <FlatList
                data={selectedSkills}
                renderItem={({ item }) => rendertags(item)}
                keyExtractor={index => index.toString()}
                horizontal
              />
            </>
          ) : null}
        </View>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          data={filteredSkills}
          defaultValue={selectedValue === '' ? '' : selectedValue}
          onChangeText={text => findSkill(text)}
          placeholder="Enter the skill"
          flatListProps={{
            renderItem: ({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  console.log(item)
                  setSelectedValue(item)
                  setSelectedSkills([...selectedSkills, item])
                  setFilteredSkills([])
                  setSelectedValue('')
                }}
              >
                <Text.Body>{item}</Text.Body>
              </TouchableOpacity>
            ),
            keyExtractor: index => index.toString(),
          }}
          inputContainerStyle={{
            borderWidth: 0,
            borderBottomWidth: 1,
            borderColor: colors[Colors.menuGrey],
          }}
        />
      </View>
    </View>
  )
}

export default SkillsForm

import { FormikProps, FormikValues } from 'formik'
import React, { useState } from 'react'
import { View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { Colors } from 'styles'
import { GetComponentProps } from 'types/react.types'
import { filterStringArray } from 'utils/strings.utils'

import Tag from '../Tag'
import Text, { MetaLevels, TextAlign } from '../Typography'
import styles from './DropDownTags.styles'

type Props = Omit<GetComponentProps<typeof DropDownPicker>, 'open' | 'setOpen' | 'setValue' | 'setItems' | 'value'> & {
  name: string
  label: string
  handlers: FormikProps<FormikValues>
}

const renderTags = (tags: string[], onDelete: (tag: string) => void) => {
  return tags.map((tag, index) => {
    return <Tag key={index} tag={tag} onDeleteSkill={onDelete} />
  })
}

const DropDownTags = ({ name, label, handlers, ...props }: Props) => {
  const [isDropDown, setIsDropDown] = useState(false)
  const [dropDownValue, setDropdownValue] = useState([])
  const { handleChange, handleBlur, errors, touched, setFieldValue } = handlers

  const deleteSkill = (tag: string) => setDropdownValue(filterStringArray(tag, dropDownValue))

  return (
    <>
      <Text.Meta level={MetaLevels.small}>{dropDownValue.length > 0 ? label : ' '}</Text.Meta>
      <DropDownPicker
        style={styles.dropDown}
        dropDownContainerStyle={styles.dropDownView}
        placeholder={label}
        placeholderStyle={styles.placeholder}
        textStyle={styles.label}
        searchTextInputStyle={styles.search}
        searchContainerStyle={styles.searchContainer}
        listMode={'MODAL'}
        onChangeValue={itemValue => {
          handleChange(name)
          handleBlur(name)
          setFieldValue(name, itemValue)
        }}
        value={dropDownValue}
        open={isDropDown}
        setOpen={setIsDropDown}
        setValue={setDropdownValue}
        {...props}
      />
      <View style={styles.tagsContainer}>{renderTags(dropDownValue, deleteSkill)}</View>
      <View style={styles.divider} />
      <Text.Meta color={Colors.primaryRed} align={TextAlign.right}>
        {errors[name] && touched[name] ? errors[name] : ' '}
      </Text.Meta>
    </>
  )
}

export default DropDownTags

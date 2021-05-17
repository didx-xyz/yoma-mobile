import { FormikProps, FormikValues } from 'formik'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { Colors } from 'styles'
import { GetComponentProps } from 'types/react.types'
import { filterStringArray, textOrSpace } from 'utils/strings.utils'

import Tag from '../Tag'
import Text, { MetaLevels, TextAlign } from '../Typography'
import styles from './DropDownTags.styles'

type Props = Omit<GetComponentProps<typeof DropDownPicker>, 'open' | 'setOpen' | 'setValue' | 'setItems' | 'value'> & {
  name: string
  label: string
  handlers: FormikProps<FormikValues>
}

const renderTags = (tags: string[], onDelete: (tag: string) => void) =>
  tags.map((tag, index) => <Tag key={index} tag={tag} onDeleteSkill={onDelete} />)

const DropDownTags = ({ name, label, handlers, ...props }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const { errors, values, touched, setFieldValue } = handlers

  const deleteSkill = (tag: string) => setFieldValue(name, filterStringArray(tag, values[name]))

  return (
    <>
      <Text.Meta level={MetaLevels.small}>{textOrSpace(values[name].length > 0, label)}</Text.Meta>
      <DropDownPicker
        style={styles.dropDown}
        dropDownContainerStyle={styles.dropDownView}
        placeholder={label}
        placeholderStyle={styles.placeholder}
        textStyle={styles.label}
        searchTextInputStyle={styles.search}
        searchContainerStyle={styles.searchContainer}
        listMode={'MODAL'}
        value={values[name]}
        open={isOpen}
        setOpen={setIsOpen}
        setValue={state => {
          let newState = state

          if (typeof state === 'function') {
            newState = state(values[name])
          }

          setFieldValue(name, newState)
        }}
        showArrowIcon={false}
        {...props}
      />
      <View style={styles.tagsContainer}>{renderTags(values[name], deleteSkill)}</View>
      <View style={styles.divider} />
      <Text.Meta color={Colors.primaryRed} align={TextAlign.right}>
        {errors[name] && touched[name] ? errors[name] : ' '}
      </Text.Meta>
    </>
  )
}

export default DropDownTags

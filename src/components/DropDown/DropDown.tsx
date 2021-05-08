import { FormikProps, FormikValues } from 'formik'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { Colors } from 'styles'
import { GetComponentProps } from 'types/react.types'

import Text, { MetaLevels, TextAlign } from '../Typography'
import styles from './DropDown.styles'

type Props = Omit<GetComponentProps<typeof DropDownPicker>, 'open' | 'setOpen' | 'setValue' | 'setItems' | 'value'> & {
  name: string
  label: string
  handlers: FormikProps<FormikValues>
}

const DropDown = ({ name, label, handlers, ...props }: Props) => {
  const [isDropDown, setIsDropDown] = useState(false)
  const [dropDownValue, setDropdownValue] = useState(null)
  const { handleChange, handleBlur, values, errors, touched, setFieldValue } = handlers
  return (
    <>
      <Text.Meta level={MetaLevels.small}>{values[name] !== '' ? label : ' '}</Text.Meta>
      <DropDownPicker
        style={styles.dropDown}
        dropDownContainerStyle={styles.dropDownView}
        placeholder={label}
        placeholderStyle={styles.placeholder}
        textStyle={styles.label}
        searchTextInputStyle={styles.search}
        searchContainerStyle={styles.searchContainer}
        listMode={'SCROLLVIEW'}
        onChangeValue={itemValue => {
          handleChange(name)
          handleBlur(name)
          setFieldValue(name, itemValue)
        }}
        value={dropDownValue}
        open={isDropDown}
        setOpen={setIsDropDown}
        setValue={setDropdownValue}
        showArrowIcon={false}
        {...props}
      />
      <Text.Meta color={Colors.primaryRed} align={TextAlign.right}>
        {errors[name] && touched[name] ? errors[name] : ' '}
      </Text.Meta>
    </>
  )
}

export default DropDown

import { FormikProps, FormikValues } from 'formik'
import React, { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { Colors } from 'styles'
import { GetComponentProps } from 'types/react.types'
import { textOrSpace } from 'utils/strings.utils'

import Text, { MetaLevels, TextAlign } from '../Typography'
import styles from './DropDown.styles'

type Props = Omit<GetComponentProps<typeof DropDownPicker>, 'open' | 'setOpen' | 'setValue' | 'setItems' | 'value'> & {
  name: string
  label: string
  handlers: FormikProps<FormikValues>
}

const DropDown = ({ name, label, handlers, ...props }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [dropDownValue, setDropdownValue] = useState(null)
  const { handleChange, handleBlur, values, errors, touched, setFieldValue } = handlers

  // useEffect(() => {
  //   setDropdownValue(values[name])
  // }, [name, values])

  return (
    <>
      <Text.Meta level={MetaLevels.small}>{textOrSpace(values[name] !== '', label)}</Text.Meta>
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
        open={isOpen}
        setOpen={setIsOpen}
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

import { useField } from 'formik'
import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'

import InputError from '~/components/InputError'
import InputLabel from '~/components/InputLabel'

import styles from './DropDown.styles'

type Props = Omit<
  React.ComponentProps<typeof DropDownPicker>,
  'open' | 'setOpen' | 'setValue' | 'setItems' | 'value'
> & {
  name: string
  label: string
}

const DropDown = ({ name, label, ...props }: Props) => {
  const [{ value }, { error, touched }, { setValue }] = useField(name)
  const [isOpen, setIsOpen] = useState(false)
  const [dropDownValue, setDropdownValue] = useState(null)

  useEffect(() => {
    if (value) {
      setDropdownValue(value)
    }
  }, [value])

  const onChangeValue = useCallback(
    (itemValue: any) => {
      if (value !== itemValue) {
        setValue(itemValue)
      }
    },
    [setValue, value],
  )

  const onSetOpen = useCallback(() => setIsOpen(isCurrentlyOpen => !isCurrentlyOpen), [])

  return (
    <View style={styles.container}>
      <InputLabel label={label} isVisible={value !== ''} />
      <DropDownPicker
        style={styles.dropDown}
        placeholder={label}
        placeholderStyle={styles.placeholder}
        textStyle={styles.label}
        searchTextInputStyle={styles.search}
        searchContainerStyle={styles.searchContainer}
        listMode={'MODAL'}
        onChangeValue={onChangeValue}
        value={dropDownValue}
        open={isOpen}
        setOpen={onSetOpen}
        setValue={setDropdownValue}
        {...props}
      />
      <InputError error={error} touched={touched} />
    </View>
  )
}

export default DropDown

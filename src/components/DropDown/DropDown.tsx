import Text, { MetaLevels } from 'components/Typography'
import { useField } from 'formik'
import React, { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { textOrSpace } from 'utils/strings.utils'

import InputError from '../InputError'
import styles from './DropDown.styles'

type Props = Omit<
  React.ComponentProps<typeof DropDownPicker>,
  'open' | 'setOpen' | 'setValue' | 'setItems' | 'value'
> & {
  name: string
  label: string
}

const DropDown = ({ name, label, ...props }: Props) => {
  const [, { value, error, touched }, { setValue }] = useField(name)
  const [isOpen, setIsOpen] = useState(false)
  const [dropDownValue, setDropdownValue] = useState(null)

  useEffect(() => {
    if (value) {
      setDropdownValue(value)
    }
  }, [value])

  return (
    <>
      <Text.Meta level={MetaLevels.Small}>{textOrSpace(value !== '', label)}</Text.Meta>
      <DropDownPicker
        style={styles.dropDown}
        dropDownContainerStyle={styles.dropDownContainer}
        placeholder={label}
        placeholderStyle={styles.placeholder}
        textStyle={styles.label}
        searchTextInputStyle={styles.search}
        searchContainerStyle={styles.searchContainer}
        listMode={'MODAL'}
        onChangeValue={(itemValue: any) => {
          if (value !== itemValue) {
            setValue(itemValue)
          }
        }}
        value={dropDownValue}
        open={isOpen}
        setOpen={() => setIsOpen(isCurrentlyOpen => !isCurrentlyOpen)}
        setValue={setDropdownValue}
        {...props}
      />
      <InputError error={error} touched={touched} />
    </>
  )
}

export default DropDown

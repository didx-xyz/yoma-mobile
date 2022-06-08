import { useField } from 'formik'
import React, { useCallback } from 'react'
import { View } from 'react-native'
import CountryPicker from 'react-native-country-picker-modal'

import { Colors, colors } from '~/styles'

import Optional from '../Optional'
import Text, { MetaLevels, TextAlign } from '../Typography'
import styles from './CountryPickerField.styles'

interface Props extends Omit<React.ComponentProps<typeof CountryPicker>, 'onSelect' | 'countryCode'> {
  name: string
  label: string
}

const CountryPickerField = ({ name, label, ...props }: Props) => {
  const [, { value, error, touched }, { setValue }] = useField(name)

  const handleOnSelect = useCallback(
    country => {
      setValue(country.cca2)
    },
    [setValue],
  )

  return (
    <View style={styles.container}>
      {label && (
        <Text.Meta level={MetaLevels.Small} color={Colors.MenuGrey}>
          {label}
        </Text.Meta>
      )}
      <CountryPicker
        onSelect={handleOnSelect}
        theme={{
          onBackgroundTextColor: colors[Colors.MenuGrey],
          fontSize: 14,
        }}
        countryCode={value}
        withEmoji={false}
        withCountryNameButton
        withFilter
        withFlag
        withAlphaFilter
        {...props}
      />
      <Optional condition={!!error && touched}>
        <Text.Meta color={Colors.PrimaryRed} align={TextAlign.Right}>
          {error}
        </Text.Meta>
      </Optional>
    </View>
  )
}

export default CountryPickerField

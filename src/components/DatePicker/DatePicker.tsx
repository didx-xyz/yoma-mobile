import React from 'react'
import { Text, TextInput, TextInputProps, View, TextStyle, ViewStyle } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { TextStyles } from 'styles'

import styles from './DatePicker.styles'

type DateTimePickerProps = {
  label: string
  touched?: boolean
  error?: any
  inputStyle?: TextStyle
  viewStyle?: ViewStyle
  showTitle?: boolean
  value: any
  onChangeDate: any
}

const DateTimePicker = ({
  label,
  touched,
  error,
  inputStyle,
  value,
  viewStyle,
  onChangeDate,
  showTitle = true,
  ...props
}: DateTimePickerProps) => {
  return (
    <View style={[{ width: '95%', alignSelf: 'center' }, viewStyle]}>
      {showTitle ? <Text style={[TextStyles.h4, styles.label]}>{label}</Text> : null}
      <DatePicker
        mode="date"
        placeholder={label}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        format={'DD/MM/YYYY'}
        customStyles={{
          dateInput: styles.dateInput,
        }}
        style={[styles.textInputStyle, { paddingHorizontal: 0 }]}
        onDateChange={onChangeDate}
        showIcon={false}
        date={value}
        maxDate={new Date()}
      />
      <Text style={TextStyles.errorText}>{touched && error}</Text>
    </View>
  )
}

export default DateTimePicker

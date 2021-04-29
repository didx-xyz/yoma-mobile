import React from 'react'
import { View } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { Colors } from 'styles'

import Optional from '../Optional'
import Text, { MetaLevels, TextAlign } from '../Typography'
import styles from './DatePicker.styles'

type DatePickerProps = {
  label: string
  isTouched?: boolean
  error?: any
  showTitle?: boolean
  value: any
  onChangeDate: any
}

const DateTimePicker = ({
  label,
  isTouched,
  error,
  value,
  onChangeDate,
  showTitle = true,
  ...props
}: DatePickerProps) => {
  return (
    <View style={styles.container}>
      <Optional condition={showTitle}>
        <Text.Meta level={MetaLevels.small}>{label}</Text.Meta>
      </Optional>
      <DatePicker
        mode="date"
        placeholder={label}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        format={'DD/MM/YYYY'}
        customStyles={{
          dateInput: styles.dateInput,
        }}
        style={styles.textInput}
        onDateChange={onChangeDate}
        showIcon={false}
        date={value}
        maxDate={new Date()}
        {...props}
      />
      <Text.Meta color={Colors.primaryRed} align={TextAlign.center}>
        {isTouched && error}
      </Text.Meta>
    </View>
  )
}

export default DateTimePicker

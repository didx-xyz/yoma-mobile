import { Optional } from 'components'
import Text, { MetaLevels, TextAlign } from 'components/Typography'
import React from 'react'
import { View } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { Colors } from 'styles'

import styles from './DatePicker.styles'

type DateTimePickerProps = {
  label: string
  touched?: boolean
  error?: any
  showTitle?: boolean
  value: any
  onChangeDate: any
}

const DateTimePicker = ({
  label,
  touched,
  error,
  value,
  onChangeDate,
  showTitle = true,
  ...props
}: DateTimePickerProps) => {
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
        style={styles.textInputStyle}
        onDateChange={onChangeDate}
        showIcon={false}
        date={value}
        maxDate={new Date()}
        {...props}
      />
      <Text.Meta color={Colors.primaryRed} align={TextAlign.center}>
        {touched && error}
      </Text.Meta>
    </View>
  )
}

export default DateTimePicker

import { FormikErrors, FormikTouched } from 'formik'
import React from 'react'
import { View } from 'react-native'
import DatePicker, { DatePickerProps } from 'react-native-datepicker'
import { Colors } from 'styles'

import Optional from '../Optional'
import Text, { MetaLevels, TextAlign } from '../Typography'
import styles from './DatePicker.styles'

type Props = DatePickerProps & {
  label: string
  isTouched?: boolean | FormikTouched<any> | FormikTouched<any>[]
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[]
  showTitle?: boolean
  value: string | Date | undefined
}

const DateTimePicker = ({ label, isTouched, error, value, showTitle = true, ...props }: Props) => {
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

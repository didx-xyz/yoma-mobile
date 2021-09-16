import DateTimePicker from '@react-native-community/datetimepicker'
import { DATE_TPL_MON_YEAR } from 'constants/date.constants'
import { FormikProps } from 'formik'
import React, { useCallback, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'
import { formatDateString } from 'utils/dates.utils'
import { textOrSpace } from 'utils/strings.utils'

import Text, { MetaLevels, TextAlign } from '../Typography'
import styles from './DatePicker.styles'

type Props = Omit<React.ComponentProps<typeof DateTimePicker>, 'value'> & {
  name: string
  label: string
  handlers: FormikProps<any> // figure out proper prop-scoping
}

const DatePicker = ({ name, label, handlers }: Props) => {
  const [date, setDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)

  const { values, errors, touched, setFieldValue, setFieldTouched } = handlers

  const onChange = useCallback(
    (event: Event, selectedDate: Date | undefined) => {
      setShowDatePicker(false)
      if (selectedDate) {
        setDate(date)
        setFieldValue(name, selectedDate, false)
      }
      setTimeout(() => {
        setFieldTouched(name, true, true)
      }, 10)
    },
    [date, name, setFieldTouched, setFieldValue],
  )

  const handleShowDatePicker = () => {
    setShowDatePicker(true)
  }

  return (
    <View style={styles.container}>
      <Text.Meta level={MetaLevels.Small}>{textOrSpace(values[name], label)}</Text.Meta>
      <TouchableOpacity onPress={handleShowDatePicker} style={styles.dateContainer}>
        <Text.Body color={values[name] ? Colors.PrimaryDarkGrey : Colors.MenuGrey}>
          {values[name] ? formatDateString(DATE_TPL_MON_YEAR)(values[name]) : label}
        </Text.Body>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker value={date} mode="date" display="spinner" onChange={onChange} maximumDate={new Date()} />
      )}
      <Text.Meta color={Colors.PrimaryRed} align={TextAlign.Right}>
        {errors[name] && touched[name] ? errors[name] : ' '}
      </Text.Meta>
    </View>
  )
}

export default DatePicker

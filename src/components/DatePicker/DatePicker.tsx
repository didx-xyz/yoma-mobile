import DateTimePicker from '@react-native-community/datetimepicker'
import { useField } from 'formik'
import React, { useCallback, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'

import * as DateConstants from '~/constants/date.constants'
import { Colors } from '~/styles'
import { formatDateString } from '~/utils/dates.utils'
import { textOrSpace } from '~/utils/strings.utils'

import Optional from '../Optional'
import Text, { MetaLevels, TextAlign } from '../Typography'
import styles from './DatePicker.styles'

type Props = Omit<React.ComponentProps<typeof DateTimePicker>, 'value'> & {
  label: string
  name: string
}

const DatePicker = ({ label, name }: Props) => {
  const [, { value, error, touched }, { setValue }] = useField(name)
  const [date, setDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)

  const onChange = useCallback(
    (event: Event, selectedDate: Date | undefined) => {
      setShowDatePicker(false)
      if (selectedDate) {
        setDate(selectedDate)
        setValue(selectedDate)
      }
    },
    [setValue],
  )

  const handleShowDatePicker = () => {
    setShowDatePicker(true)
  }

  return (
    <View style={styles.container}>
      <Text.Meta level={MetaLevels.Small}>{textOrSpace(value, label)}</Text.Meta>
      <TouchableOpacity onPress={handleShowDatePicker} style={styles.dateContainer}>
        <Text.Body color={value ? Colors.PrimaryDarkGrey : Colors.MenuGrey}>
          {value ? formatDateString(DateConstants.DATE_TPL_DAY_MON_YEAR)(value) : label}
        </Text.Body>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker value={date} mode="date" display="spinner" onChange={onChange} maximumDate={new Date()} />
      )}
      <Optional condition={!!error && touched}>
        <Text.Meta color={Colors.PrimaryRed} align={TextAlign.Right}>
          {error}
        </Text.Meta>
      </Optional>
    </View>
  )
}

export default DatePicker

import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import { Colors } from '../../styles'
import DatePicker from '../DatePicker'
import Text from '../Typography'
import styles from './DateRangeSelect.styles'

interface Props {
  label?: string
}

const DateRangeSelect = ({ label }: Props) => {
  const { t } = useTranslation()

  return (
    <>
      {label && <Text.Body color={Colors.MenuGrey}>{label}</Text.Body>}
      <View style={styles.row}>
        <DatePicker name="startTime" label={t('Start date')} />
        <DatePicker name="endTime" label={t('End date')} />
      </View>
    </>
  )
}

export default DateRangeSelect

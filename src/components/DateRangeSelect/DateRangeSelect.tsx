import { FormikProps } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import DatePicker from '../DatePicker'
import Text, { MetaLevels } from '../Typography'
import styles from './DateRangeSelect.styles'

interface Props {
  handlers: FormikProps<any>
  label?: string
}

const DateRangeSelect = ({ handlers, label }: Props) => {
  const { t } = useTranslation()

  return (
    <>
      {label && <Text.Meta level={MetaLevels.Small}>{label}</Text.Meta>}
      <View style={styles.row}>
        <DatePicker name="startDate" label={t('Start date')} handlers={handlers} />
        <DatePicker name="endDate" label={t('End date')} handlers={handlers} />
      </View>
    </>
  )
}

export default DateRangeSelect

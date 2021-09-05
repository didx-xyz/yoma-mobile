import Text, { BodyLevels, HeaderLevels } from 'components/Typography'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'

import { formatISOWithFallback } from '../../../utils/dates.utils'
import Avatar from '../../Avatar'
import styles from './CvWidgetCredential.styles'

interface Props {
  name: string
  startDate: string
  isValidated: boolean
  organisationLogoURL?: string
}
const CvWidgetCredential = ({ name, startDate, organisationLogoURL, isValidated }: Props) => {
  const [formattedDate, setFormattedDate] = useState('')

  useEffect(() => {
    const dateWithFallback = formatISOWithFallback('MMM yyyy')(startDate)
    setFormattedDate(dateWithFallback)
  }, [startDate])

  return (
    <View style={styles.container}>
      <View style={styles.imageWrap}>
        <Avatar name={name} url={organisationLogoURL} isValidated={isValidated} />
      </View>
      <View style={styles.content}>
        <Text.Header level={HeaderLevels.H6}>{name}</Text.Header>
        <Text.Body level={BodyLevels.Small}>{formattedDate}</Text.Body>
      </View>
    </View>
  )
}

export default CvWidgetCredential

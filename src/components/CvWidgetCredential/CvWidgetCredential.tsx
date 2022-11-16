import React, { useEffect, useState } from 'react'
import { Pressable, View } from 'react-native'

import Text, { BodyLevels, HeaderLevels } from '~/components/Typography'
import { formatISOWithFallback } from '~/utils/dates.utils'

import Avatar from '../Avatar'
import styles from './CvWidgetCredential.styles'

interface Props {
  title: string
  onPress: () => void
  startDate: string
  isValidated: boolean
  organisationLogoURL?: string
}
const CvWidgetCredential = ({ title, startDate, organisationLogoURL, onPress, isValidated }: Props) => {
  const [formattedDate, setFormattedDate] = useState('')

  useEffect(() => {
    const dateWithFallback = formatISOWithFallback('MMM yyyy')(startDate)
    setFormattedDate(dateWithFallback)
  }, [startDate])

  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.imageWrap}>
          <Avatar name={title} url={organisationLogoURL} isValidated={isValidated} />
        </View>
        <View style={styles.content}>
          <Text.Header level={HeaderLevels.H6}>{title}</Text.Header>
          <Text.Body level={BodyLevels.Small}>{formattedDate}</Text.Body>
        </View>
      </View>
    </Pressable>
  )
}

export default CvWidgetCredential

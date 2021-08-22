import Text, { BodyLevels, HeaderLevels } from 'components/Typography'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'

import Avatar from '../../../components/Avatar'
import { formatISOWithFallback } from '../../../utils/dates.utils'
import styles from './UserChallengeItem.styles'

interface Props {
  name: string
  startDate: string
  isValidated: boolean
  organisationLogoURL?: string
}
const UserChallengeItem = ({ name, startDate, organisationLogoURL, isValidated }: Props) => {
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
        <Text.Header level={HeaderLevels.h6}>{name}</Text.Header>
        <Text.Body level={BodyLevels.small}>{formattedDate}</Text.Body>
      </View>
    </View>
  )
}

export default UserChallengeItem

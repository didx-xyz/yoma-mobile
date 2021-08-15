import Text, { BodyLevels, HeaderLevels } from 'components/Typography'
import { format, parseISO } from 'date-fns'
import React from 'react'
import { View } from 'react-native'

import Avatar from '../../../components/Avatar'
import styles from './UserChallengeItem.styles'

interface Props {
  name: string
  startDate: string
  avatarUrl?: string
  isValidated: boolean
}
const UserChallengeItem = ({ name, startDate, avatarUrl, isValidated }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrap}>
        <Avatar name={name} url={avatarUrl} isValidated={isValidated} />
      </View>
      <View style={styles.content}>
        <Text.Header level={HeaderLevels.h6}>{name}</Text.Header>
        <Text.Body level={BodyLevels.small}>{format(parseISO(startDate), 'MMM yyyy')}</Text.Body>
      </View>
    </View>
  )
}

export default UserChallengeItem

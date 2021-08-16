import Text, { BodyLevels, HeaderLevels } from 'components/Typography'
import React from 'react'
import { View } from 'react-native'

import { Optional } from '../../components'
import styles from './Challenge.styles'

interface Props {
  name: string
  startDate: string
  avatarUrl: string
  isValidated: boolean
}
const Challenge = ({ name, startDate, avatarUrl, isValidated }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrap}>
        <Optional condition={isValidated}>
          <Text.Body level={BodyLevels.small} style={styles.validated}>
            Tick {avatarUrl}
          </Text.Body>
        </Optional>
        <Text.Header level={HeaderLevels.h3}>👾</Text.Header>
      </View>
      <View style={styles.content}>
        <Text.Header level={HeaderLevels.h6}>{name}</Text.Header>
        <Text.Body level={BodyLevels.small}>{startDate}</Text.Body>
      </View>
    </View>
  )
}

export default Challenge

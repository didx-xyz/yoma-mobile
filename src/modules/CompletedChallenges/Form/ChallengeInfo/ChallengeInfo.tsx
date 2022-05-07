import React from 'react'
import { View } from 'react-native'

import Optional from '~/components/Optional'
import Spacer from '~/components/Spacer'
import Text, { Bold, HeaderLevels } from '~/components/Typography'

import { Challenge } from '../../../Challenges/Challenges.types'
import styles from './ChallengeInfo.styles'

interface Props {
  challenge?: Challenge
}

const ChallengeInfo = ({ challenge }: Props) => {
  return (
    <View style={styles.container}>
      <Text.Header level={HeaderLevels.H4}>About {challenge?.name}:</Text.Header>
      <Spacer height={16} />
      <Text.Body>
        <Bold>Challenge Host:</Bold> {challenge?.organisationName}
      </Text.Body>
      <Spacer height={8} />
      <Text.Body>
        <Bold>Description:</Bold> {challenge?.description}
      </Text.Body>
      <Optional condition={!!challenge?.skills && challenge?.skills.length > 0}>
        <Spacer height={8} />
        <Text.Body>
          <Bold>Skills:</Bold> {challenge?.skills?.join(' | ')}
        </Text.Body>
      </Optional>
    </View>
  )
}

export default ChallengeInfo

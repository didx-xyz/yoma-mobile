import Text, { BodyLevels, HeaderLevels } from 'components/Typography'
import React from 'react'
import { View } from 'react-native'

import { Optional } from '../../components'

interface Props {
  name: string
  startDate: string
  avatarUrl: string
  isValidated: boolean
}
const Challenge = ({ name, startDate, avatarUrl, isValidated }: Props) => {
  return (
    <View style={{ flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 20 }}>
      <View style={{ position: 'relative', width: 36, marginRight: 14 }}>
        <Optional condition={isValidated}>
          <Text.Body level={BodyLevels.small} style={{ position: 'absolute', top: 0, right: 0 }}>
            Tick {avatarUrl}
          </Text.Body>
        </Optional>
        <Text.Header level={HeaderLevels.h3}>👾</Text.Header>
      </View>
      <View style={{ flex: 1 }}>
        <Text.Header level={HeaderLevels.h6}>{name}</Text.Header>
        <Text.Body level={BodyLevels.small}>{startDate}</Text.Body>
      </View>
    </View>
  )
}

export default Challenge

import React from 'react'
import { Image, View } from 'react-native'

import { Colors } from '../../styles'
import Text, { HeaderLevels } from '../Typography'
import VerifiedTick from '../VerifiedTick'
import { Optional } from '../index'
import styles from './Avatar.styles'

interface AvatarFallbackProps {
  char: string
}
const AvatarFallback = ({ char }: AvatarFallbackProps) => (
  <View style={styles.avatarFallbackContainer}>
    <Text.Header level={HeaderLevels.h3} color={Colors.primaryDarkGrey}>
      {char[0]}
    </Text.Header>
  </View>
)

interface Props {
  url?: string
  name: string
  isValidated: boolean
}
const Avatar = ({ url, name, isValidated }: Props) => (
  <View style={styles.container}>
    <Optional condition={isValidated}>
      <View style={styles.verifiedWrap}>
        <VerifiedTick />
      </View>
    </Optional>
    <Optional condition={!!url} fallback={<AvatarFallback char={name[0]} />}>
      <Image source={{ uri: url }} style={styles.image} />
    </Optional>
  </View>
)

export default Avatar

import React from 'react'
import { Image, View } from 'react-native'

import { Colors } from '../../styles'
import Optional from '../Optional'
import Text, { HeaderLevels } from '../Typography'
import VerifiedTick from '../VerifiedTick'
import styles from './Avatar.styles'

interface AvatarFallbackProps {
  char: string
}
const AvatarFallback = ({ char }: AvatarFallbackProps) => (
  <View style={styles.avatarFallbackContainer}>
    <Text.Header level={HeaderLevels.H3} color={Colors.PrimaryDarkGrey}>
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
      <View style={styles.imageWrap}>
        <Image source={{ uri: url }} style={styles.image} />
      </View>
    </Optional>
  </View>
)

export default Avatar

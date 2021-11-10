import React from 'react'
import { Pressable, View } from 'react-native'

import { CrossIcon } from '~/assets/images'
import Text from '~/components/Typography'
import { Colors } from '~/styles'

import { ICON_SIZE } from './Pill.constants'
import styles from './Pill.styles'

type Props = {
  name: string
  onDelete: (pill: string) => void
}

const Pill = ({ name, onDelete }: Props) => {
  return (
    <Pressable style={styles.container} onPress={() => onDelete(name)}>
      <View style={styles.crossIcon}>
        <CrossIcon height={ICON_SIZE} width={ICON_SIZE} />
      </View>
      <Text.Body color={Colors.PrimaryBlue}>{name}</Text.Body>
    </Pressable>
  )
}

export default Pill

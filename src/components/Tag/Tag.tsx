import { CrossIcon } from 'assets/images'
import Text from 'components/Typography'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'

import { ICON_SIZE } from './Tag.constants'
import styles from './Tag.styles'

type Props = {
  tag: string
  onDeleteTag: (tag: string) => void
}

const Tag = ({ tag, onDeleteTag }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onDeleteTag(tag)}>
      <View style={styles.crossIcon}>
        <CrossIcon height={ICON_SIZE} width={ICON_SIZE} />
      </View>
      <Text.Body color={Colors.primaryBlue}>{tag}</Text.Body>
    </TouchableOpacity>
  )
}

export default Tag

import { CrossIcon } from 'assets/images'
import Text from 'components/Typography'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'

import { ICON_SIZE } from './Tag.constants'
import styles from './Tag.styles'

type Props = {
  tag: string
  onDeleteSkill: (skill: string) => void
}

const Tag = ({ tag, onDeleteSkill }: Props) => {
  return (
    <View style={styles.tag}>
      <TouchableOpacity style={styles.crossIcon} onPress={() => onDeleteSkill(tag)}>
        <CrossIcon height={ICON_SIZE} width={ICON_SIZE} />
      </TouchableOpacity>
      <Text.Body color={Colors.primaryBlue}>{tag}</Text.Body>
    </View>
  )
}

export default Tag

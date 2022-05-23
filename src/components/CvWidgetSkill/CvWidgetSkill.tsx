import React from 'react'
import { Pressable, View } from 'react-native'

import Text, { HeaderLevels } from '~/components/Typography'
import { Colors } from '~/styles'

import styles from './CvWidgetSkill.styles'

interface Props {
  name: string
  onPress: () => void
}

const CvWidgetSkill = ({ name, onPress }: Props) => (
  <Pressable onPress={onPress}>
    <View style={styles.container}>
      <Text.Header level={HeaderLevels.H6} color={Colors.DarkGrey02}>
        {name}
      </Text.Header>
    </View>
  </Pressable>
)

export default CvWidgetSkill

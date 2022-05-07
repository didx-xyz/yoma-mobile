import { map } from 'ramda'
import React from 'react'
import { Pressable, View } from 'react-native'

import Pill from '~/components/Pill'
import Text from '~/components/Typography'
import { Colors } from '~/styles'

import styles from './PillContainer.styles'

interface Props {
  pills: string[]
  onDelete: (pill: string) => void
  onAdd: () => void
}

const PillContainer = ({ pills, onDelete, onAdd }: Props) => {
  console.log({ pills })
  return (
    <View style={styles.container}>
      {map((pill: string) => <Pill key={pill} name={pill} onDelete={onDelete} />)(pills)}
      <Pressable onPress={onAdd} style={styles.add}>
        <Text.Body color={Colors.PrimaryDarkGrey}>+ Add Skills</Text.Body>
      </Pressable>
    </View>
  )
}

export default PillContainer

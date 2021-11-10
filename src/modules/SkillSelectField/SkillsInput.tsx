import { map } from 'ramda'
import React from 'react'
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native'

import Divider from '~/components/Divider'
import InputError from '~/components/InputError'
import Optional from '~/components/Optional'
import Pill from '~/components/Pill'
import Text from '~/components/Typography'

import { AddIcon } from '../../assets/images'
import Spacer from '../../components/Spacer'
import { Colors, colors } from '../../styles'
import { applyAlphaToHex } from '../../styles/styles.utils'

const pillsStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  } as ViewStyle,
  add: {
    backgroundColor: applyAlphaToHex(colors[Colors.PrimaryDarkGrey])(0.15),
    borderRadius: 33,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 20,
  } as ViewStyle,
})
interface PillsProps {
  pills: string[]
  onDelete: (pill: string) => void
  onAdd: () => void
}
const Pills = ({ pills, onDelete, onAdd }: PillsProps) => {
  console.log({ pills })
  return (
    <View style={pillsStyles.container}>
      {map((pill: string) => <Pill key={pill} name={pill} onDelete={onDelete} />)(pills)}
      <Pressable onPress={onAdd} style={pillsStyles.add}>
        <Text.Body color={Colors.PrimaryDarkGrey}>+ Add Skills</Text.Body>
      </Pressable>
    </View>
  )
}
interface Props {
  skills: string[]
  onDelete: (skill: string) => void
  onAdd: () => void
  touched: boolean
  error?: string
}
const SkillsInput = ({ skills, onDelete, onAdd, touched, error }: Props) => {
  return (
    <View style={{ marginTop: 10, paddingVertical: 10, paddingHorizontal: 10 }}>
      <Optional condition={skills.length > 0} fallback={<Text.Body onPress={onAdd}>Select your skills</Text.Body>}>
        <Pills pills={skills} onDelete={onDelete} onAdd={onAdd} />
      </Optional>
      <Spacer height={10} />
      <Divider />
      <InputError error={error} touched={touched} />
    </View>
  )
}

export default SkillsInput

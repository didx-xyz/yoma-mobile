import React from 'react'
import { View } from 'react-native'

import Divider from '~/components/Divider'
import InputError from '~/components/InputError'
import InputLabel from '~/components/InputLabel'
import PillBox from '~/components/PillBox'
import Spacer from '~/components/Spacer'

import styles from './SkillsInput.styles'

interface Props {
  skills: string[]
  label?: string
  onDelete: (skill: string) => void
  onAdd: () => void
  touched: boolean
  error?: string
}
const SkillsInput = ({ skills, label, onDelete, onAdd, touched, error }: Props) => (
  <View style={styles.container}>
    <InputLabel label={label} isVisible={!!label} />
    <PillBox pills={skills} onDelete={onDelete} onAdd={onAdd} />
    <Spacer height={10} />
    <Divider />
    <InputError error={error} touched={touched} />
  </View>
)

export default SkillsInput

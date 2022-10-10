import React from 'react'
import { View } from 'react-native'

import Divider from '~/components/Divider'
import InputError from '~/components/InputError'
import Optional from '~/components/Optional'
import PillBox from '~/components/PillBox'
import Spacer from '~/components/Spacer'
import Text, { HeaderLevels } from '~/components/Typography'

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
    <Optional condition={!!label}>
      <Text.Header level={HeaderLevels.H6}>{label}</Text.Header>
    </Optional>
    <PillBox pills={skills} onDelete={onDelete} onAdd={onAdd} />
    <Spacer height={10} />
    <Divider />
    <InputError error={error} touched={touched} />
  </View>
)

export default SkillsInput

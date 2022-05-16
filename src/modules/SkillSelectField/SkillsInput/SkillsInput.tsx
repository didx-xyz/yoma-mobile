import React from 'react'
import { View } from 'react-native'

import Divider from '~/components/Divider'
import InputError from '~/components/InputError'
import PillContainer from '~/components/PillContainer'
import Spacer from '~/components/Spacer'
import Text, { HeaderLevels } from '~/components/Typography'

import styles from './SkillsInput.styles'

interface Props {
  skills: string[]
  placeholder: string
  onDelete: (skill: string) => void
  onAdd: () => void
  touched: boolean
  error?: string
}
const SkillsInput = ({ skills, placeholder, onDelete, onAdd, touched, error }: Props) => (
  <View style={styles.container}>
    <Text.Header level={HeaderLevels.H6}>{placeholder}</Text.Header>
    <PillContainer pills={skills} onDelete={onDelete} onAdd={onAdd} />
    <Spacer height={10} />
    <Divider />
    <InputError error={error} touched={touched} />
  </View>
)

export default SkillsInput

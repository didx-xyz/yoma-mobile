import React from 'react'
import { Pressable } from 'react-native'

import CvViewSkill from '~/components/CvViewSkill'

interface Props {
  name: string
  count: number
  onPress: () => void
}

const CvWidgetSkill = ({ name, count, onPress }: Props) => (
  <Pressable onPress={onPress}>
    <CvViewSkill count={count} name={name} />
  </Pressable>
)

export default CvWidgetSkill

import React from 'react'
import { TouchableOpacity } from 'react-native'

import { BackIconGrey } from '../../assets/images'

interface Props {
  onPress: () => void
}
const ButtonBack = ({ onPress }: Props) => (
  <TouchableOpacity onPress={onPress}>
    <BackIconGrey />
  </TouchableOpacity>
)

export default ButtonBack

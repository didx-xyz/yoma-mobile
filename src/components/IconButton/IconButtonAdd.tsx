import React from 'react'

import { AddIcon } from '~/assets/images'
import IconButton from '~/components/IconButton/IconButton'

interface Props {
  onPress: () => void
}
const IconButtonAdd = ({ onPress }: Props) => (
  <IconButton onPress={onPress}>
    <AddIcon />
  </IconButton>
)

export default IconButtonAdd

import React from 'react'

import { EditIcon } from '~/assets/images'
import IconButton from '~/components/IconButton/IconButton'

interface Props {
  onPress: () => void
}
const IconButtonEdit = ({ onPress }: Props) => (
  <IconButton onPress={onPress}>
    <EditIcon />
  </IconButton>
)

export default IconButtonEdit

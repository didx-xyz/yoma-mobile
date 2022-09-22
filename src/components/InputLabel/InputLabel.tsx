import React from 'react'

import { textOrSpace } from '../../utils/strings.utils'
import Text, { MetaLevels } from '../Typography'

interface Props {
  label?: string
  isVisible?: boolean
}
const InputLabel = ({ isVisible, label = '' }: Props) => (
  <Text.Meta level={MetaLevels.Small}>{textOrSpace(!!isVisible, label)}</Text.Meta>
)

export default InputLabel

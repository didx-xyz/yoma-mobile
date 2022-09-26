import React from 'react'

import Text, { MetaLevels } from '~/modules/Typography'
import { textOrSpace } from '~/utils/strings.utils'

interface Props {
  label?: string
  isVisible?: boolean
}
const InputLabel = ({ isVisible, label = '' }: Props) => (
  <Text.Meta level={MetaLevels.Small}>{textOrSpace(!!isVisible, label)}</Text.Meta>
)

export default InputLabel

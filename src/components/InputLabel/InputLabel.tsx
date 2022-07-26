import React from 'react'

import Text, { MetaLevels } from '../Typography'

interface Props {
  label?: string
}
const InputLabel = ({ label = '' }: Props) => <Text.Meta level={MetaLevels.Small}>{label}</Text.Meta>

export default InputLabel

import React, { useEffect, useState } from 'react'
import { TextStyle } from 'react-native'

import { WithChildren } from '../../../types/react.types'
import Text from '../Text'
import styles from './Meta.styles'
import { MetaLevels } from './Meta.types'

type Props = WithChildren<
  React.ComponentProps<typeof Text> & {
    level?: MetaLevels
  }
>
const Meta = ({ level = MetaLevels.Small, children, ...props }: Props) => {
  const [presetStyle, setPresetStyle] = useState<TextStyle>({})
  useEffect(() => {
    setPresetStyle(styles[level])
  }, [level])
  return (
    <Text presetStyle={presetStyle} {...props}>
      {children}
    </Text>
  )
}

export default Meta

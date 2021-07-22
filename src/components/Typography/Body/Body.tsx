import React, { useEffect, useState } from 'react'
import { TextStyle } from 'react-native'

import { GetComponentProps, WithChildren } from '../../../types/react.types'
import Text from '../Text'
import { TextAlign } from '../Text.types'
import styles from './Body.styles'
import { BodyLevels } from './Body.types'

type Props = WithChildren<
  GetComponentProps<typeof Text> & {
    align?: TextAlign
    level?: BodyLevels
  }
>
const Body = ({ level = BodyLevels.regular, children, ...props }: Props) => {
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

export default Body

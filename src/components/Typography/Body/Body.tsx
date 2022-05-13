import React, { useMemo } from 'react'

import { WithChildren } from '~/types/react.types'

import Text from '../Text'
import styles from './Body.styles'
import { BodyLevels } from './Body.types'

type Props = WithChildren<
  React.ComponentProps<typeof Text> & {
    level?: BodyLevels
  }
>
const Body = ({ level = BodyLevels.Regular, children, ...props }: Props) => {
  const presetStyle = useMemo(() => styles[level], [level])

  return (
    <Text presetStyle={presetStyle} {...props}>
      {children}
    </Text>
  )
}

export default Body

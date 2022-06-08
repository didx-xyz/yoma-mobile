import React, { useMemo } from 'react'

import { WithChildren } from '~/types/react.types'

import Text from '../Text'
import styles from './Meta.styles'
import { MetaLevels } from './Meta.types'

type Props = WithChildren<
  React.ComponentProps<typeof Text> & {
    level?: MetaLevels
  }
>
const Meta = ({ level = MetaLevels.Small, children, ...props }: Props) => {
  const presetStyle = useMemo(() => styles[level], [level])

  return (
    <Text presetStyle={presetStyle} {...props}>
      {children}
    </Text>
  )
}

export default Meta

import React from 'react'
import { Colors } from 'styles'
import { WithChildren } from 'types/react.types'
import { formatDateString } from 'utils/dates.utils'

import Text, { BodyLevels } from '../Typography'

type Props = WithChildren<{
  template: string
  date: string
}>

const DateDisplay = ({ children, template, date }: Props) => {
  return (
    <Text.Body level={BodyLevels.small} color={Colors.menuGrey}>
      {formatDateString(template)(date)}
      {children}
    </Text.Body>
  )
}

export default DateDisplay

import { equals } from 'ramda'
import React, { ReactNode } from 'react'
import { WithChildren } from 'types/react.types'

type Props = WithChildren<{
  condition: boolean
  fallback?: ReactNode
}>

const Optional = ({ condition, fallback, children }: Props) =>
  equals(true, condition) ? <>{children}</> : <>{fallback}</>

export default Optional

import { isNil } from 'ramda'
import { ReactNode } from 'react'

export const shouldShowContent = (count: number | undefined, children: ReactNode): boolean =>
  !!children && ((!!count && count > 0) || isNil(count))

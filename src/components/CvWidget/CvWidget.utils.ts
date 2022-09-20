import { isNil } from 'ramda'
import { ReactNode } from 'react'

export const shouldShowContent = (
  count: number | undefined,
  shouldOverride: boolean | undefined,
  children: ReactNode,
): boolean => (!!children && isNil(shouldOverride) ? (!!count && count > 0) || isNil(count) : shouldOverride || false)

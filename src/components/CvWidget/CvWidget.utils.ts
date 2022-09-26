import { isNil, lt } from 'ramda'
import { ReactNode } from 'react'

import { isNotNil } from '~/utils/ramda.utils'

export const shouldShowContent = (
  count: number | undefined,
  shouldOverride: boolean | undefined,
  children: ReactNode,
): boolean => {
  if (isNotNil(children) && isNil(shouldOverride)) {
    return (isNotNil(count) && lt(0, count)) || isNil(count)
  }

  return !!shouldOverride
}

import { useMemo } from 'react'

import { navLetters, shouldAdjustHeight } from './AlphabeticListNavigator.utils'

export const useLetterNavigation = (viewHeight: number, data: string[]) => {
  const letters = useMemo(() => {
    const shouldAddBullets = shouldAdjustHeight(viewHeight)(data)
    return navLetters(shouldAddBullets)(data)
  }, [data, viewHeight])

  return {
    letters,
  }
}

import { useEffect, useMemo, useState } from 'react'

import { navLetters } from './AlphabetListNavigator.utils'

export const useLetterNavigation = () => {
  const [data, setData] = useState<string[]>([])

  const letters = useMemo(() => navLetters(data), [data])

  useEffect(() => {
    console.log(letters)
  }, [letters])

  return {
    setData,
    letters,
  }
}

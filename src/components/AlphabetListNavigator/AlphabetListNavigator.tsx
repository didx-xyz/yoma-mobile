import React, { useEffect, useMemo } from 'react'
import { View } from 'react-native'

import { useLetterNavigation } from './AlphabetListNavigator.hooks'
import styles from './AlphabetListNavigator.styles'
import { NavLetter } from './AlphabetListNavigator.types'
import AlphabetListNavigatorItem from './AlphabetListNavigatorItem'

interface Props {
  data: string[]
  onNav: (letter: NavLetter) => void
}

const AlphabetListNavigator = ({ data, onNav }: Props) => {
  const { setData, letters } = useLetterNavigation()

  useEffect(() => {
    setData(data)
  }, [data, setData])

  const results = useMemo(
    () => letters.map(letter => <AlphabetListNavigatorItem letter={letter} onNav={onNav} />),
    [letters, onNav],
  )
  return <View style={styles.container}>{results}</View>
}

export default AlphabetListNavigator

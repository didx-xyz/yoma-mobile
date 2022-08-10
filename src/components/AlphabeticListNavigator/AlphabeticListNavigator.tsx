import { map } from 'ramda'
import React, { useMemo } from 'react'
import { View } from 'react-native'

import { useLetterNavigation } from './AlphabeticListNavigator.hooks'
import styles from './AlphabeticListNavigator.styles'
import { NavLetter } from './AlphabeticListNavigator.types'
import AlphabetListNavigatorItem from './Item'

interface Props {
  data: string[]
  onNav: (letter: NavLetter) => void
  listContainerHeight: number
}
const AlphabetListNavigator = ({ data, onNav, listContainerHeight }: Props) => {
  const { letters } = useLetterNavigation(listContainerHeight, data)

  const navItems = useMemo(
    () =>
      map(
        (letter: NavLetter) => <AlphabetListNavigatorItem key={letter.index} letter={letter} onNav={onNav} />,
        letters,
      ),
    [letters, onNav],
  )

  return <View style={styles.container}>{navItems}</View>
}

export default AlphabetListNavigator

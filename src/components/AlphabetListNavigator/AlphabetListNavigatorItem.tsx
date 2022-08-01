import React, { useCallback } from 'react'

import Text, { MetaLevels } from '~/components/Typography'
import { Colors } from '~/styles'

import { NavLetter } from './AlphabetListNavigator.types'
import styles from './AlphabetListNavigatorItem.styles'

interface Props {
  letter: NavLetter
  onNav: (letter: NavLetter) => void
}

const AlphabetListNavigatorItem = ({ letter, onNav }: Props) => {
  const onPress = useCallback(() => {
    onNav(letter)
  }, [letter, onNav])
  return (
    <Text.Meta level={MetaLevels.SmallBold} style={styles.container} color={Colors.DarkGrey02} onPress={onPress}>
      {letter.name}
    </Text.Meta>
  )
}

export default AlphabetListNavigatorItem

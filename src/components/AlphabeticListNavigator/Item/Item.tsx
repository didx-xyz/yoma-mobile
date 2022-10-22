import React, { useCallback } from 'react'
import { Pressable } from 'react-native'

import { NavLetter } from '../AlphabetListNavigator.types'
import LetterItem from './LetterItem'
import SpacerItem from './SpacerItem'

interface Props {
  letter: NavLetter
  onNav: (letter: NavLetter) => void
}
const Item = ({ letter, onNav }: Props) => {
  const onPress = useCallback(() => {
    onNav(letter)
  }, [letter, onNav])

  return letter.isSpacer ? (
    <SpacerItem name={letter.name} />
  ) : (
    <Pressable
      onPress={onPress}
      hitSlop={{
        top: 10,
        left: 10,
        bottom: 10,
        right: 10,
      }}
    >
      <LetterItem name={letter.name} />
    </Pressable>
  )
}

export default Item

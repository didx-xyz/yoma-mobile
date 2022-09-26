import React from 'react'

import Text, { BodyLevels } from '~/components/Typography'
import { Colors } from '~/styles'

import styles from './LetterItem.styles'

interface Props {
  name: string
}
const LetterItem = ({ name }: Props) => (
  <Text.Body level={BodyLevels.Small} color={Colors.DarkGrey02} style={styles.container}>
    {name}
  </Text.Body>
)

export default LetterItem

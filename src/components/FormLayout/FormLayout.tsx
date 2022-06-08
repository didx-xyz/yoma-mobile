import React from 'react'
import { View } from 'react-native'

import { WithChildren } from '~/types/react.types'

import styles from './FormLayout.styles'

type Props = WithChildren<{}>

const FormLayout = ({ children }: Props) => {
  return <View style={styles.container}>{children}</View>
}

export default FormLayout

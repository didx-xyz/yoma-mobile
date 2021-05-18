import React from 'react'
import { View } from 'react-native'

import { WithChildren } from '../../types/react.types'
import styles from './FormWrapper.styles'

type Props = WithChildren<{}>

const FormWrapper = ({ children }: Props) => {
  return <View style={styles.container}>{children}</View>
}

export default FormWrapper

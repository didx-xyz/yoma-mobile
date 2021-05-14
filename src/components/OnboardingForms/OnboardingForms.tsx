import React from 'react'
import { View } from 'react-native'

import { WithChildren } from '../../types/react.types'
import styles from './OnboardingForms.styles'

type Props = WithChildren<{}>

const OnboardingForms = ({ children }: Props) => {
  return <View style={styles.container}>{children}</View>
}

export default OnboardingForms

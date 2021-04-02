import React from 'react'
import { Button, Text, View } from 'react-native'

import ViewContainer from '../../components/ViewContainer/ViewContainer'
import styles from './DigitalCvHome.styles'

interface Props {
  navigation: any
}

const DigitalCvHome = ({ navigation }: Props) => (
  <ViewContainer style={styles.container}>
    <Text style={styles.text}>DigitalCv</Text>
  </ViewContainer>
)

export default DigitalCvHome

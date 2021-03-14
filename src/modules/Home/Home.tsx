import React from 'react'
import { Text } from 'react-native'

import ViewContainer from '../../components/ViewContainer/ViewContainer'
import styles from './Home.styles'

const Home = () => (
  <ViewContainer style={styles.container}>
    <Text style={styles.text}>Home</Text>
  </ViewContainer>
)

export default Home

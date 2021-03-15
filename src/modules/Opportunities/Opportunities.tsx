import React from 'react'
import { Button, Text, View } from 'react-native'

import ViewContainer from '../../components/ViewContainer/ViewContainer'
import styles from './Opportunities.styles'

interface Props {
  navigation: any
}

const Opportunities = ({ navigation }: Props) => (
  <ViewContainer style={styles.container}>
    <Text style={styles.text}>Opportunities</Text>
    <View style={{ marginTop: 50 }}>
      <Button title="Go to Digital CV" onPress={() => navigation.navigate('Digital CV')} />
      <Button title="Go to Earn" onPress={() => navigation.navigate('Earn')} />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go to Onboarding" onPress={() => navigation.navigate('Onboarding')} />
      <Button title="Go to Opportunities" onPress={() => navigation.navigate('Opportunities')} disabled />
      <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
    </View>
  </ViewContainer>
)

export default Opportunities

import React from 'react'
import { Button, Text, View } from 'react-native'

import ViewContainer from '../../components/ViewContainer/ViewContainer'
import styles from './Onboarding.styles'

interface Props {
  navigation: any
}

const Onboarding = ({ navigation }: Props) => (
  <ViewContainer style={styles.container}>
    <Text style={styles.text}>Onboarding</Text>
    <View style={{ marginTop: 50 }}>
      <Button title="Go to Digital CV" onPress={() => navigation.navigate('Digital CV')} />
      <Button title="Go to Earn" onPress={() => navigation.navigate('Earn')} />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go to Onboarding" onPress={() => navigation.navigate('Onboarding')} disabled />
      <Button title="Go to Opportunities" onPress={() => navigation.navigate('Opportunities')} />
      <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
    </View>
  </ViewContainer>
)

export default Onboarding

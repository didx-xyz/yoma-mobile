import NormalHeader from 'components/NormalHeader/NormalHeader'
import ViewContainer from 'components/ViewContainer/ViewContainer'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'

import styles from './Experience.styles'
import ExperienceForm from './ExperienceForm/ExperienceForm'

interface Props {
  navigation: any
}

const Experience = ({ navigation }: Props) => {
  return (
    <ViewContainer style={styles.container}>
      <NormalHeader navigation={navigation} headerText={'Experience'} onSave={() => {}} />
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <View style={styles.whiteCard}>
          <ExperienceForm />
        </View>
      </ScrollView>
    </ViewContainer>
  )
}

export default Experience

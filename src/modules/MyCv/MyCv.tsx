import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { ScrollView } from 'react-native'

import FirstTimeCard from '~/components/FirstTimeCard'
import ViewContainer from '~/components/ViewContainer'

import { AboutWidget } from '../About'
import { CompletedChallengesWidget } from '../CompletedChallenges'
import { EducationWidget } from '../Education'
import { ExperienceWidget } from '../Experience'
import HomeHeader from '../HomeHeader'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../HomeNavigation/HomeNavigation.types'
import { MySkillsWidget } from '../MySkills'
import styles from './MyCv.styles'

interface Props {
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MyCv>
}

const MyCv = ({ navigation }: Props) => (
  <ViewContainer style={styles.container}>
    <HomeHeader navigation={navigation} />
    <ScrollView contentContainerStyle={styles.scrollInnerContainer}>
      <FirstTimeCard />
      <AboutWidget navigation={navigation} />
      <ExperienceWidget navigation={navigation} />
      <EducationWidget navigation={navigation} />
      <MySkillsWidget navigation={navigation} />
      <CompletedChallengesWidget navigation={navigation} />
    </ScrollView>
  </ViewContainer>
)

export default MyCv

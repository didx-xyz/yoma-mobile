import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { ScrollView } from 'react-native'

import FirstTimeCard from '~/components/FirstTimeCard'
import ViewContainer from '~/components/ViewContainer'
import { AboutWidget } from '~/modules/About'
import { CompletedChallengesWidget } from '~/modules/CompletedChallenges'
import { CompletedCoursesWidget } from '~/modules/CompletedCourses'
import { EducationWidget } from '~/modules/Education'
import { ExperienceWidget } from '~/modules/Experience'
import HomeHeader from '~/modules/HomeHeader'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '~/modules/HomeNavigation/HomeNavigation.types'
import { MySkillsWidget } from '~/modules/MySkills'

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
      <CompletedCoursesWidget navigation={navigation} />
      <CompletedChallengesWidget navigation={navigation} />
    </ScrollView>
  </ViewContainer>
)

export default MyCv

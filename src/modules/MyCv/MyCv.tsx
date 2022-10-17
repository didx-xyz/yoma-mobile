import React from 'react'
import { ScrollView } from 'react-native'

import FirstTimeCard from '~/components/FirstTimeCard'
import ViewContainer from '~/components/ViewContainer'
import { AboutWidget } from '~/modules/About'
import { CompletedChallengesWidget } from '~/modules/CompletedChallenges'
import { CompletedCoursesWidget } from '~/modules/CompletedCourses'
import { EducationWidget } from '~/modules/Education'
import HomeHeader from '~/modules/HomeHeader'
import { MySkillsWidget } from '~/modules/MySkills'
import { WorkExperienceWidget } from '~/modules/WorkExperience'

import styles from './MyCv.styles'
import { MyCvNavigation } from './MyCv.types'

interface Props {
  navigation: MyCvNavigation
}

const MyCv = ({ navigation }: Props) => (
  <ViewContainer style={styles.container}>
    <HomeHeader navigation={navigation} />
    <ScrollView contentContainerStyle={styles.scrollInnerContainer}>
      <FirstTimeCard />
      <AboutWidget navigation={navigation} />
      <WorkExperienceWidget navigation={navigation} />
      <EducationWidget navigation={navigation} />
      <MySkillsWidget navigation={navigation} />
      <CompletedCoursesWidget navigation={navigation} />
      <CompletedChallengesWidget navigation={navigation} />
    </ScrollView>
  </ViewContainer>
)

export default MyCv

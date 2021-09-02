import { StackNavigationProp } from '@react-navigation/stack'
import { FirstTimeCard, ViewContainer } from 'components'
import CvCard from 'components/CvCard'
import HomeHeader from 'modules/HomeHeader'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from 'modules/HomeNavigation/HomeNavigation.types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'

import Text, { TextAlign } from '../../components/Typography'
import { Colors } from '../../styles'
import { UserChallengesWidget } from '../UserChallenges'
import { UserJobsWidget } from '../UserJobs'
import styles from './DigitalCv.styles'

interface Props {
  biography: string
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.DigitalCv>
}

const DigitalCv = ({ navigation, biography }: Props) => {
  const { t } = useTranslation()
  return (
    <ViewContainer style={styles.container}>
      <HomeHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <FirstTimeCard />
        <CvCard
          title={t('About')}
          fallback={t('Your biography is one of the first things recruiters look at. Write a great one!')}
          onEdit={() => navigation.navigate(HomeNavigationRoutes.About)}
        >
          <Text.Body align={TextAlign.center}>{biography}</Text.Body>
        </CvCard>
        <UserJobsWidget navigation={navigation} />
        <CvCard
          count={0}
          badgeColor={Colors.PrimaryRed}
          title={t('Education')}
          fallback={t('Which school, university or college did you attend?')}
          onEdit={() => navigation.navigate(HomeNavigationRoutes.Education)}
        />
        <CvCard
          count={0}
          badgeColor={Colors.PrimaryGreen}
          title={t('My skills')}
          fallback={t('Tell us what you are great at.')}
          onEdit={() => navigation.navigate(HomeNavigationRoutes.Skills)}
        />
        <CvCard
          count={0}
          badgeColor={Colors.PrimaryYellow}
          title={t('Completed courses')}
          fallback={t('Have you completed any courses yet?')}
          onEdit={() => navigation.navigate(HomeNavigationRoutes.MyCourses)}
        />
        <UserChallengesWidget navigation={navigation} />
      </ScrollView>
    </ViewContainer>
  )
}

export default DigitalCv

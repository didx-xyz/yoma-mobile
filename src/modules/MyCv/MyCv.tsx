import { StackNavigationProp } from '@react-navigation/stack'
import { FirstTimeCard, ViewContainer } from 'components'
import CvWidget from 'components/CvWidget'
import HomeHeader from 'modules/HomeHeader'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from 'modules/HomeNavigation/HomeNavigation.types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'

import Text, { TextAlign } from '../../components/Typography'
import { Colors } from '../../styles'
import { CompletedChallengesWidget } from '../CompletedChallenges'
import { UserJobsWidget } from '../UserJobs'
import styles from './MyCv.styles'

interface Props {
  biography: string
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MyCv>
}

const MyCv = ({ navigation, biography }: Props) => {
  const { t } = useTranslation()
  return (
    <ViewContainer style={styles.container}>
      <HomeHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <FirstTimeCard />
        <CvWidget
          title={t('About')}
          fallback={t('Your biography is one of the first things recruiters look at. Write a great one!')}
          onEdit={() => navigation.navigate(HomeNavigationRoutes.About)}
        >
          <Text.Body align={TextAlign.Center}>{biography}</Text.Body>
        </CvWidget>
        <UserJobsWidget navigation={navigation} />
        <CvWidget
          count={0}
          badgeColor={Colors.PrimaryRed}
          title={t('Education')}
          fallback={t('Which school, university or college did you attend?')}
          onEdit={() => navigation.navigate(HomeNavigationRoutes.Education)}
        />
        <CvWidget
          count={0}
          badgeColor={Colors.PrimaryGreen}
          title={t('My skills')}
          fallback={t('Tell us what you are great at.')}
          onEdit={() => navigation.navigate(HomeNavigationRoutes.MySkills)}
        />
        <CompletedChallengesWidget navigation={navigation} />
      </ScrollView>
    </ViewContainer>
  )
}

export default MyCv

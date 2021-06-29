import { StackNavigationProp } from '@react-navigation/stack'
import { ViewContainer, HomeHeader, FirstTimeCard, CvCard } from 'components'
import { HomeNavigationRoutes } from 'modules/HomeNavigation/HomeNavigation.routes'
import { HomeNavigatorParamsList } from 'modules/HomeNavigation/HomeNavigation.types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'
import { Colors } from 'styles'

import styles from './DigitalCv.styles'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.DigitalCv>
}

const DigitalCv = ({ navigation }: Props) => {
  const { t } = useTranslation()
  return (
    <ViewContainer style={styles.container}>
      <HomeHeader navigation={navigation} profileProgressPercentage={10} rewardPoints={1000} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <FirstTimeCard />
        <CvCard
          cardTitle={t('About')}
          defaultText={t('Your biography is one of the first things recruiters look at. Write a great one!')}
          hasCountBadge={false}
          onEdit={() => navigation.navigate(HomeNavigationRoutes.About)}
        />
        <CvCard
          count={0}
          badgeColor={Colors.primaryBlue}
          cardTitle={t('Experience')}
          defaultText={t('Where do you currently work?')}
          onEdit={() => navigation.navigate(HomeNavigationRoutes.Experience)}
        />
        <CvCard
          count={0}
          badgeColor={Colors.primaryRed}
          cardTitle={t('Education')}
          defaultText={t('Which school, university or college did you attend?')}
          onEdit={() => navigation.navigate(HomeNavigationRoutes.Education)}
        />
        <CvCard
          count={0}
          badgeColor={Colors.primaryGreen}
          cardTitle={t('My skills')}
          defaultText={t('Tell us what you are great at.')}
          onEdit={() => navigation.navigate(HomeNavigationRoutes.Skills)}
        />
        <CvCard
          count={0}
          badgeColor={Colors.primaryYellow}
          cardTitle={t('Completed courses')}
          defaultText={t('Have you completed any courses yet?')}
          onEdit={() => navigation.navigate(HomeNavigationRoutes.MyCourses)}
        />
        <CvCard
          count={0}
          badgeColor={Colors.secondaryPurple}
          cardTitle={t('Completed challenges')}
          defaultText={t('Have you completed any challenges yet?')}
          onEdit={() => navigation.navigate(HomeNavigationRoutes.MyChallenges)}
        />
      </ScrollView>
    </ViewContainer>
  )
}

export default DigitalCv

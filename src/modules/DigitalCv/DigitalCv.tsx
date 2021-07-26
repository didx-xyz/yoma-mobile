import { StackNavigationProp } from '@react-navigation/stack'
import { FirstTimeCard, ViewContainer } from 'components'
import CvCard, { CvCardOld } from 'components/CvCard'
import HomeHeader from 'components/HomeHeader'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from 'modules/HomeNavigation/HomeNavigation.types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'

import Text, { TextAlign } from '../../components/Typography'
import { Colors } from '../../styles'
import styles from './DigitalCv.styles'

interface Props {
  biography: string
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.DigitalCv>
}

const DigitalCv = ({ navigation, biography }: Props) => {
  const { t } = useTranslation()
  return (
    <ViewContainer style={styles.container}>
      <HomeHeader navigation={navigation} profileProgressPercentage={10} rewardPoints={1000} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <FirstTimeCard />
        <CvCard
          title={t('About')}
          fallback={t('Your biography is one of the first things recruiters look at. Write a great one!')}
          onEdit={() => navigation.navigate(HomeNavigationRoutes.About)}
        >
          <Text.Body align={TextAlign.center}>{biography}</Text.Body>
        </CvCard>
        <CvCardOld
          cardTitle={t('About')}
          defaultText={t('Your biography is one of the first things recruiters look at. Write a great one!')}
          content={biography}
          hasCountBadge={false}
          onEdit={() => navigation.navigate(HomeNavigationRoutes.About)}
        />
        <CvCardOld
          count={0}
          badgeColor={Colors.primaryBlue}
          cardTitle={t('Experience')}
          defaultText={t('Where do you currently work?')}
          onEdit={() => navigation.navigate(HomeNavigationRoutes.Experience)}
        />
        <CvCardOld
          count={0}
          badgeColor={Colors.primaryRed}
          cardTitle={t('Education')}
          defaultText={t('Which school, university or college did you attend?')}
          onEdit={() => navigation.navigate(HomeNavigationRoutes.Education)}
        />
        <CvCardOld
          count={0}
          badgeColor={Colors.primaryGreen}
          cardTitle={t('My skills')}
          defaultText={t('Tell us what you are great at.')}
          onEdit={() => navigation.navigate(HomeNavigationRoutes.Skills)}
        />
        <CvCardOld
          count={0}
          badgeColor={Colors.primaryYellow}
          cardTitle={t('Completed courses')}
          defaultText={t('Have you completed any courses yet?')}
          onEdit={() => navigation.navigate(HomeNavigationRoutes.MyCourses)}
        />
        <CvCardOld
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

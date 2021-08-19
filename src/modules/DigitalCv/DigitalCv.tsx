import { StackNavigationProp } from '@react-navigation/stack'
import { FirstTimeCard, ViewContainer } from 'components'
import CvCard from 'components/CvCard'
import HomeHeader from 'components/HomeHeader'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from 'modules/HomeNavigation/HomeNavigation.types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'

import Text, { TextAlign } from '../../components/Typography'
import { Colors } from '../../styles'
import { UserChallengesWidget } from '../UserChallenges'
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
        <CvCard
          count={0}
          badgeColor={Colors.primaryBlue}
          title={t('Experience')}
          fallback={t('Where do you currently work?')}
          onEdit={() => navigation.navigate(HomeNavigationRoutes.Experience)}
        />
        <CvCard
          count={0}
          badgeColor={Colors.primaryRed}
          title={t('Education')}
          fallback={t('Which school, university or college did you attend?')}
          onEdit={() => navigation.navigate(HomeNavigationRoutes.Education)}
        />
        <CvCard
          count={0}
          badgeColor={Colors.primaryGreen}
          title={t('My skills')}
          fallback={t('Tell us what you are great at.')}
          onEdit={() => navigation.navigate(HomeNavigationRoutes.Skills)}
        />
        <CvCard
          count={0}
          badgeColor={Colors.primaryYellow}
          title={t('Completed courses')}
          fallback={t('Have you completed any courses yet?')}
          onEdit={() => navigation.navigate(HomeNavigationRoutes.MyCourses)}
        />
        <UserChallengesWidget
          navigation={navigation}
          challenges={{
            ids: [],
            entities: {},
          }}
        />
      </ScrollView>
    </ViewContainer>
  )
}

export default DigitalCv

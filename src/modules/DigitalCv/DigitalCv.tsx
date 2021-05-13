import { ViewContainer, HomeHeader, FirstTimeCard, CvCard } from 'components'
import { NavigationRoutes } from 'modules/Home/Home.routes'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'
import { Colors } from 'styles'

import styles from './DigitalCv.styles'

interface Props {
  navigation: any
}

const DigitalCv = ({ navigation }: Props) => {
  const { t } = useTranslation()
  return (
    <ViewContainer style={styles.container}>
      <HomeHeader navigation={navigation} percentCompleted={10} tokens={1000} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <FirstTimeCard navigation={navigation} />
        <CvCard
          cardTitle={t('About')}
          defaultText={t('Your biography is one of the first things recruiters look at. Write a great one!')}
          hasCountBadge={false}
          onEdit={() => navigation.navigate(NavigationRoutes.About)}
        />
        <CvCard
          count={0}
          badgeColor={Colors.primaryBlue}
          cardTitle={t('Experience')}
          defaultText={t('Where do you currently work?')}
          onEdit={() => navigation.navigate(NavigationRoutes.Experience)}
        />
        <CvCard
          count={0}
          badgeColor={Colors.primaryRed}
          cardTitle={t('Education')}
          defaultText={t('Which school, university or college did you attend?')}
          onEdit={() => navigation.navigate(NavigationRoutes.Education)}
        />
        <CvCard
          count={0}
          badgeColor={Colors.primaryGreen}
          cardTitle={t('My skills')}
          defaultText={t('Tell us what you are great at.')}
          onEdit={() => navigation.navigate(NavigationRoutes.Skills)}
        />
        <CvCard
          count={0}
          badgeColor={Colors.primaryYellow}
          cardTitle={t('Completed courses')}
          defaultText={t('Have you completed any courses yet?')}
          onEdit={() => navigation.navigate(NavigationRoutes.MyCourses)}
        />
        <CvCard
          count={0}
          badgeColor={Colors.secondaryPurple}
          cardTitle={t('Completed challenges')}
          defaultText={t('Have you completed any challenges yet?')}
          onEdit={() => navigation.navigate(NavigationRoutes.MyChallenges)}
        />
      </ScrollView>
    </ViewContainer>
  )
}

export default DigitalCv

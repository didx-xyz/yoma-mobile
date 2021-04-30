import { ViewContainer, HomeHeader, FirstTimeCard, CvCard } from 'components'
import { NavigationRoutes } from 'modules/Home/Home.routes'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'
import { colors, Colors } from 'styles'
import { applyAlphaToHex } from 'styles/styles.utils'

import styles from './DigitalCv.styles'

interface Props {
  navigation: any
}

const DigitalCv = ({ navigation }: Props) => {
  const { t } = useTranslation()
  return (
    <ViewContainer style={styles.container}>
      <HomeHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <FirstTimeCard navigation={navigation} />
        <CvCard
          cardTitle={t('About')}
          defaultText={t('Your biography is one of the first things recruiters look at. Write a great one!')}
          hasCount={false}
          onEdit={() => navigation.navigate(NavigationRoutes.About)}
        />
        <CvCard
          hasCount={true}
          count={0}
          countColor={Colors.primaryBlue}
          countBackgroundColor={applyAlphaToHex(colors[Colors.primaryBlue])(0.1)}
          cardTitle={t('Experience')}
          defaultText={t('Where do you currently work?')}
          onEdit={() => navigation.navigate(NavigationRoutes.Experience)}
        />
        <CvCard
          hasCount={true}
          count={0}
          countColor={Colors.primaryRed}
          countBackgroundColor={applyAlphaToHex(colors[Colors.primaryRed])(0.1)}
          cardTitle={t('Education')}
          defaultText={t('Which school, university or college did you attend?')}
          onEdit={() => navigation.navigate(NavigationRoutes.Education)}
        />
        <CvCard
          hasCount={true}
          count={0}
          countColor={Colors.primaryGreen}
          countBackgroundColor={applyAlphaToHex(colors[Colors.primaryGreen])(0.1)}
          cardTitle={t('My skills')}
          defaultText={t('Tell us what you are great at.')}
          onEdit={() => navigation.navigate(NavigationRoutes.Skills)}
        />
        <CvCard
          hasCount={true}
          count={0}
          countColor={Colors.primaryYellow}
          countBackgroundColor={applyAlphaToHex(colors[Colors.primaryYellow])(0.1)}
          cardTitle={t('Completed courses')}
          defaultText={t('Have you completed any courses yet?')}
          onEdit={() => navigation.navigate('NewCourse')}
        />
        <CvCard
          hasCount={true}
          count={0}
          countColor={Colors.secondaryPurple}
          countBackgroundColor={applyAlphaToHex(colors[Colors.secondaryPurple])(0.1)}
          cardTitle={t('Completed challenges')}
          defaultText={t('Have you completed any challenges yet?')}
          onEdit={() => navigation.navigate(NavigationRoutes.NewChallenge)}
        />
      </ScrollView>
    </ViewContainer>
  )
}

export default DigitalCv

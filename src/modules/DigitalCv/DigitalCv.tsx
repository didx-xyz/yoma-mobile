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
          countBackgroundColor={Colors.primaryBlue}
          cardTitle={t('Experience')}
          defaultText={t('Where do you currently work?')}
          onEdit={() => navigation.navigate(NavigationRoutes.Experience)}
        />
        <CvCard
          hasCount={true}
          count={0}
          countColor={Colors.primaryRed}
          countBackgroundColor={Colors.primaryRed}
          cardTitle={t('Education')}
          defaultText={t('Which school, university or college did you attend?')}
          onEdit={() => navigation.navigate('Education')}
        />
        <CvCard
          hasCount={true}
          count={0}
          countColor={Colors.primaryGreen}
          countBackgroundColor={Colors.primaryGreen}
          cardTitle={t('My skills')}
          defaultText={t('Tell us what you are great at.')}
          onEdit={() => navigation.navigate('Skills')}
        />
      </ScrollView>
    </ViewContainer>
  )
}

export default DigitalCv

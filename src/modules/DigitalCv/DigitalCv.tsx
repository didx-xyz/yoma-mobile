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
      <ScrollView contentContainerStyle={{ paddingVertical: 15 }}>
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
          countBackgroundColor={Colors.unsavedStyleLightBlue}
          cardTitle={t('Experience')}
          defaultText={t('Where do you currently work?')}
          onEdit={() => navigation.navigate(NavigationRoutes.Experience)}
        />
        <CvCard
          hasCount={true}
          count={0}
          countColor={Colors.primaryRed}
          countBackgroundColor={Colors.unsavedStyleLightRed}
          cardTitle={t('Education')}
          defaultText={t('Which school, university or college did you attend?')}
        />
        <CvCard
          hasCount={true}
          count={0}
          countColor={Colors.primaryGreen}
          countBackgroundColor={Colors.unsavedStyleLightRed}
          cardTitle={t('My skills')}
          defaultText={t('Tell us what you are great at.')}
        />
      </ScrollView>
    </ViewContainer>
  )
}

export default DigitalCv

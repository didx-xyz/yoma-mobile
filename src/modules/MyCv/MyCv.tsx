import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'

import CvWidget from '../../components/CvWidget'
import FirstTimeCard from '../../components/FirstTimeCard'
import Text, { TextAlign } from '../../components/Typography'
import ViewContainer from '../../components/ViewContainer'
import { Colors } from '../../styles'
import { CompletedChallengesWidget } from '../CompletedChallenges'
import { EducationWidget } from '../Education'
import { ExperienceWidget } from '../Experience'
import HomeHeader from '../HomeHeader'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../HomeNavigation/HomeNavigation.types'
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
      <ScrollView contentContainerStyle={styles.scrollInnerContainer}>
        <FirstTimeCard />
        <CvWidget
          title={t('About')}
          fallback={t('Your biography is one of the first things recruiters look at. Write a great one!')}
          onEdit={() => navigation.navigate(HomeNavigationRoutes.About)}
        >
          <Text.Body align={TextAlign.Center}>{biography}</Text.Body>
        </CvWidget>
        <ExperienceWidget navigation={navigation} />
        <EducationWidget navigation={navigation} />
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

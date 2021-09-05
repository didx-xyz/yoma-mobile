import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import CvWidget, { CvWidgetCredential, CvWidgetList } from '../../../components/CvWidget'
import { Colors } from '../../../styles'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import { NormalisedUserChallengeItem } from '../../UserChallenges/UserChallenges.types'

interface Props {
  challenges: NormalisedUserChallengeItem
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MyCv>
}
const CompletedChallengesWidget = ({ challenges, navigation }: Props) => {
  const { t } = useTranslation()
  return (
    <CvWidget
      count={challenges.ids.length}
      badgeColor={Colors.SecondaryPurple}
      title={t('Completed challenges')}
      fallback={t('Have you completed any challenges yet?')}
      onEdit={() => {
        navigation.navigate(HomeNavigationRoutes.UserChallenges)
      }}
    >
      <CvWidgetList
        data={challenges}
        onViewAll={() => {
          navigation.navigate(HomeNavigationRoutes.UserChallenges)
        }}
        RenderItem={CvWidgetCredential}
      />
    </CvWidget>
  )
}
export default CompletedChallengesWidget

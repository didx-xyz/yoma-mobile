import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import CvWidget, { CvWidgetList } from '../../../components/CvWidget'
import CvWidgetCredential, { types as CvWidgetCredentialTypes } from '../../../components/CvWidgetCredential'
import { Colors } from '../../../styles'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'

interface Props {
  userChallenges: CvWidgetCredentialTypes.NormalisedCvWidgetCredentialItems
  count: number
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MyCv>
}
const CompletedChallengesWidget = ({ userChallenges, count, navigation }: Props) => {
  const { t } = useTranslation()
  return (
    <CvWidget
      count={count}
      badgeColor={Colors.SecondaryPurple}
      title={t('Completed challenges')}
      fallback={t('Have you completed any challenges yet?')}
      onEdit={() => {
        navigation.navigate(HomeNavigationRoutes.CompletedChallenges)
      }}
    >
      <CvWidgetList
        data={userChallenges}
        onViewAll={() => {
          navigation.navigate(HomeNavigationRoutes.CompletedChallenges)
        }}
        RenderItem={CvWidgetCredential}
      />
    </CvWidget>
  )
}
export default CompletedChallengesWidget

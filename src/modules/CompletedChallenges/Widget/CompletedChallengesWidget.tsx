import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import CvWidget, { CvWidgetList } from '~/components/CvWidget'
import CvWidgetCredential, { types as CvWidgetCredentialTypes } from '~/components/CvWidgetCredential'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '~/modules/HomeNavigation/HomeNavigation.types'
import { Colors } from '~/styles'

interface Props {
  userChallenges: CvWidgetCredentialTypes.NormalisedCvWidgetCredentialItems
  count: number
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MyCv>
}
const CompletedChallengesWidget = ({ userChallenges, count, navigation }: Props) => {
  const { t } = useTranslation()
  return (
    <CvWidget
      count={count}
      badgeColor={Colors.SecondaryPurple}
      title={t('Completed challenges')}
      noDataMessage={t('Have you completed any challenges yet?')}
      onAction={() => {
        navigation.navigate(HomeNavigationRoutes.CompletedChallengesForm)
      }}
    >
      <CvWidgetList
        data={userChallenges}
        viewRoute={HomeNavigationRoutes.CompletedChallenges}
        navigation={navigation}
        RenderItem={CvWidgetCredential}
      />
    </CvWidget>
  )
}
export default CompletedChallengesWidget

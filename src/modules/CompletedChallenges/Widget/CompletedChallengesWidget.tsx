import React from 'react'
import { useTranslation } from 'react-i18next'

import CvWidget, { CvWidgetList } from '~/components/CvWidget'
import CvWidgetCredential, { types as CvWidgetCredentialTypes } from '~/components/CvWidgetCredential'
import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'
import { types as MyCvTypes } from '~/modules/MyCv'
import { Colors } from '~/styles'

interface Props {
  userChallenges: CvWidgetCredentialTypes.NormalisedCvWidgetCredentialItems
  count: number
  navigation: MyCvTypes.MyCvNavigation
}
const CompletedChallengesWidget = ({ userChallenges, count, navigation }: Props) => {
  const { t } = useTranslation()

  return (
    <CvWidget
      count={count}
      badgeColor={Colors.SecondaryPurple}
      title={t('Completed challenges')}
      noDataMessage={t('Have you completed any challenges yet?')}
      onActionPress={() => {
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

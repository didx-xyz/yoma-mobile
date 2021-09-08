import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import CvWidget, { CvWidgetList } from '../../../components/CvWidget'
import CvWidgetCredential, { types as CvWidgetCredentialTypes } from '../../../components/CvWidgetCredential'
import { Colors } from '../../../styles'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'

interface Props {
  userJobs: CvWidgetCredentialTypes.NormalisedCvWidgetCredentialItems
  count: number
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MyCv>
}
const ExperienceWidget = ({ userJobs, count, navigation }: Props) => {
  const { t } = useTranslation()
  return (
    <CvWidget
      count={count}
      badgeColor={Colors.SecondaryPurple}
      title={t('Experience')}
      fallback={t('Where do you currently work?')}
      onEdit={() => {
        navigation.navigate(HomeNavigationRoutes.Experience)
      }}
    >
      <CvWidgetList
        data={userJobs}
        onViewAll={() => {
          navigation.navigate(HomeNavigationRoutes.Experience)
        }}
        RenderItem={CvWidgetCredential}
      />
    </CvWidget>
  )
}
export default ExperienceWidget

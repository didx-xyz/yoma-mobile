import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import CvWidget, { CvWidgetCredential, CvWidgetList } from '../../../components/CvWidget'
import { Colors } from '../../../styles'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import { NormalisedUserJobs } from '../../UserJobs/UserJobs.types'

interface Props {
  userJobs: NormalisedUserJobs
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

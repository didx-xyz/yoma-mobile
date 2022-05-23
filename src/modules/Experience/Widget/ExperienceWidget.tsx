import React from 'react'
import { useTranslation } from 'react-i18next'

import CvWidget, { CvWidgetList } from '~/components/CvWidget'
import CvWidgetCredential, { types as CvWidgetCredentialTypes } from '~/components/CvWidgetCredential'
import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'
import { types as MyCvTypes } from '~/modules/MyCv'
import { Colors } from '~/styles'

interface Props {
  userJobs: CvWidgetCredentialTypes.NormalisedCvWidgetCredentialItems
  count: number
  navigation: MyCvTypes.MyCvNavigation
}
const ExperienceWidget = ({ userJobs, count, navigation }: Props) => {
  const { t } = useTranslation()

  return (
    <CvWidget
      count={count}
      badgeColor={Colors.SecondaryPurple}
      title={t('Experience')}
      noDataMessage={t('Where do you currently work?')}
      onAction={() => {
        navigation.navigate(HomeNavigationRoutes.ExperienceForm)
      }}
    >
      <CvWidgetList
        data={userJobs}
        viewRoute={HomeNavigationRoutes.Experience}
        navigation={navigation}
        RenderItem={CvWidgetCredential}
      />
    </CvWidget>
  )
}
export default ExperienceWidget

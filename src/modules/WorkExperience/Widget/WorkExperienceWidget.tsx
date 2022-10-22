import React from 'react'
import { useTranslation } from 'react-i18next'

import CvWidget, { CvWidgetList } from '~/components/CvWidget'
import CvWidgetCredential, { types as CvWidgetCredentialTypes } from '~/components/CvWidgetCredential'
import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'
import { types as MyCvTypes } from '~/modules/MyCv'
import { Colors } from '~/styles'

interface Props {
  userWorkExperiences: CvWidgetCredentialTypes.NormalisedCvWidgetCredentialItems
  count: number
  navigation: MyCvTypes.MyCvNavigation
}
const WorkExperienceWidget = ({ userWorkExperiences, count, navigation }: Props) => {
  const { t } = useTranslation()

  return (
    <CvWidget
      count={count}
      badgeColor={Colors.SecondaryPurple}
      title={t('WorkExperience')}
      noDataMessage={t('Where do you currently work?')}
      onActionPress={() => {
        navigation.navigate(HomeNavigationRoutes.WorkExperienceForm)
      }}
    >
      <CvWidgetList
        data={userWorkExperiences}
        viewRoute={HomeNavigationRoutes.WorkExperience}
        navigation={navigation}
        RenderItem={CvWidgetCredential}
      />
    </CvWidget>
  )
}
export default WorkExperienceWidget

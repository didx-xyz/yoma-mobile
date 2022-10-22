import React, { useCallback } from 'react'
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
const ExperienceWidget = ({ userWorkExperiences, count, navigation }: Props) => {
  const { t } = useTranslation()

  const onActionPress = useCallback(() => {
    navigation.navigate(HomeNavigationRoutes.WorkExperienceForm)
  }, [navigation])

  return (
    <CvWidget
      count={count}
      badgeColor={Colors.SecondaryPurple}
      title={t('Experience')}
      noDataMessage={t('Where do you currently work?')}
      onActionPress={onActionPress}
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
export default ExperienceWidget

import React from 'react'
import { useTranslation } from 'react-i18next'

import CvWidget, { CvWidgetList } from '~/components/CvWidget'
import CvWidgetCredential, { types as CvWidgetCredentialTypes } from '~/components/CvWidgetCredential'
import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'
import { types as MyCvTypes } from '~/modules/MyCv'
import { Colors } from '~/styles'

interface Props {
  userQualifications: CvWidgetCredentialTypes.NormalisedCvWidgetCredentialItems
  count: number
  navigation: MyCvTypes.MyCvNavigation
}

const CompletedCoursesWidget = ({ userQualifications, count, navigation }: Props) => {
  const { t } = useTranslation()

  return (
    <CvWidget
      count={count}
      badgeColor={Colors.PrimaryYellow}
      title={t('Completed courses')}
      noDataMessage={t('Have you completed any courses yet?')}
      onActionPress={() => {
        navigation.navigate(HomeNavigationRoutes.CompletedCoursesForm)
      }}
    >
      <CvWidgetList
        data={userQualifications}
        viewRoute={HomeNavigationRoutes.CompletedCourses}
        navigation={navigation}
        RenderItem={CvWidgetCredential}
      />
    </CvWidget>
  )
}
export default CompletedCoursesWidget

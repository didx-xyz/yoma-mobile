import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'
import { types as MyCvTypes } from '~/modules/MyCv'
import { UserQualificationsWidget } from '~/modules/UserQualifications'
import { Colors } from '~/styles'

import selector from './CompletedCoursesWidget.selector'

interface Props {
  navigation: MyCvTypes.MyCvNavigation
}

const CompletedCoursesWidgetContainer = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const { userQualifications, count } = useSelector(selector)

  return (
    <UserQualificationsWidget
      badgeColor={Colors.PrimaryRed}
      title={t('Completed courses')}
      noDataMessage={t('Have you completed any courses yet?')}
      viewRoute={HomeNavigationRoutes.CompletedCourses}
      formRoute={HomeNavigationRoutes.CompletedCoursesForm}
      userQualifications={userQualifications}
      count={count}
      navigation={navigation}
    />
  )
}

export default CompletedCoursesWidgetContainer

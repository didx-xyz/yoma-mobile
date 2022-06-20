import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { CompletedCoursesNavigation } from '~/modules/CompletedCourses/types'
import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'
import { UserQualificationsView } from '~/modules/UserQualifications'

import selector from './CompletedCoursesView.selector'

interface Props {
  navigation: CompletedCoursesNavigation
}
const CompletedCoursesViewContainer = ({ navigation }: Props) => {
  const { userQualifications } = useSelector(selector)
  const { t } = useTranslation()

  return (
    <UserQualificationsView
      title={t('Completed courses')}
      noDataMessage={t('Which school, university or college did you attend?')}
      route={HomeNavigationRoutes.CompletedCoursesForm}
      navigation={navigation}
      userQualifications={userQualifications}
    />
  )
}

export default CompletedCoursesViewContainer

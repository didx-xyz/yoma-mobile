import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { CompletedCoursesNavigation } from '~/modules/CompletedCourses/types'
import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'
import { UserEducationView } from '~/modules/UserEducation'

import selector from './CompletedCoursesView.selector'

interface Props {
  navigation: CompletedCoursesNavigation
}
const CompletedCoursesViewContainer = ({ navigation }: Props) => {
  const { userQualifications } = useSelector(selector)
  const { t } = useTranslation()

  return (
    <UserEducationView
      title={t('Courses')}
      noDataMessage={t('Have you completed any courses yet?')}
      route={HomeNavigationRoutes.CompletedCoursesForm}
      navigation={navigation}
      userQualifications={userQualifications}
    />
  )
}

export default CompletedCoursesViewContainer

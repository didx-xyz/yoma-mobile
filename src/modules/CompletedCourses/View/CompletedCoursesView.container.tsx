import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { CompletedCoursesNavigation } from '~/modules/CompletedCourses/types'
import { UserQualificationsView } from '~/modules/UserQualifications'

import selector from './CompletedCoursesView.selector'

interface Props {
  onAdd: () => void
  navigation: CompletedCoursesNavigation
}
const CompletedCoursesViewContainer = ({ onAdd, navigation }: Props) => {
  const { userQualifications } = useSelector(selector)
  const { t } = useTranslation()

  return (
    <UserQualificationsView
      title={t('Completed Courses')}
      noDataMessage={t('Which school, university or college did you attend?')}
      onAdd={onAdd}
      navigation={navigation}
      userQualifications={userQualifications}
    />
  )
}

export default CompletedCoursesViewContainer

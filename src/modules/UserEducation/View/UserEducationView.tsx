import React, { useCallback } from 'react'

import CvView, { CvViewList } from '~/components/CvView'
import CvViewCredential, { types as CvViewCredentialTypes } from '~/components/CvViewCredential'
import { CompletedCoursesNavigation } from '~/modules/CompletedCourses/types'
import { EducationNavigation } from '~/modules/Education/types'
import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'

interface Props {
  title: string
  noDataMessage: string
  route: HomeNavigationRoutes
  navigation: EducationNavigation | CompletedCoursesNavigation
  userQualifications: CvViewCredentialTypes.CvViewCredentialsData
}
const UserEducationView = ({ title, noDataMessage, route, navigation, userQualifications }: Props) => {
  const onAdd = useCallback(() => {
    navigation.navigate(route)
  }, [navigation, route])

  return (
    <CvView title={title} noDataMessage={noDataMessage} onAction={onAdd} navigation={navigation}>
      <CvViewList data={userQualifications} RenderItem={CvViewCredential} />
    </CvView>
  )
}

export default UserEducationView

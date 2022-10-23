import React, { useCallback } from 'react'

import CvView, { CvViewList } from '~/components/CvView'
import CvViewCredential, { types as CvViewCredentialTypes } from '~/components/CvViewCredential'
import { EducationNavigation } from '~/modules/Education/types'
import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'

interface Props {
  title: string
  noDataMessage: string
  route: HomeNavigationRoutes
  navigation: EducationNavigation
  userEducation: CvViewCredentialTypes.CvViewCredentialsData
}
const EducationView = ({ title, noDataMessage, route, navigation, userEducation }: Props) => {
  const onAdd = useCallback(() => {
    navigation.navigate(route)
  }, [navigation, route])

  return (
    <CvView title={title} noDataMessage={noDataMessage} onAction={onAdd} navigation={navigation}>
      <CvViewList data={userEducation} RenderItem={CvViewCredential} />
    </CvView>
  )
}

export default EducationView

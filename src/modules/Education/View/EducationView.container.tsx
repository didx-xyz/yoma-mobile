import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { EducationNavigation } from '~/modules/Education/types'
import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'
import { UserQualificationsView } from '~/modules/UserQualifications'

import selector from './EducationView.selector'

interface Props {
  navigation: EducationNavigation
}
const EducationViewContainer = ({ navigation }: Props) => {
  const { userQualifications } = useSelector(selector)
  const { t } = useTranslation()

  return (
    <UserQualificationsView
      title={t('Education')}
      noDataMessage={t('Which school, university or college did you attend?')}
      route={HomeNavigationRoutes.EducationForm}
      navigation={navigation}
      userQualifications={userQualifications}
    />
  )
}

export default EducationViewContainer

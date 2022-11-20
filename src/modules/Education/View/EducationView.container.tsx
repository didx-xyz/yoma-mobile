import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'

import { EducationNavigation } from '../types'
import EducationView from './EducationView'
import selector from './EducationView.selector'

interface Props {
  navigation: EducationNavigation
}
const EducationViewContainer = ({ navigation }: Props) => {
  const { userEducation } = useSelector(selector)
  const { t } = useTranslation()

  return (
    <EducationView
      title={t('Education')}
      noDataMessage={t('Which school, university or college did you attend?')}
      route={HomeNavigationRoutes.EducationForm}
      navigation={navigation}
      userEducation={userEducation}
    />
  )
}

export default EducationViewContainer

import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'
import { types as MyCvTypes } from '~/modules/MyCv'
import { Colors } from '~/styles'

import EducationWidget from './EducationWidget'
import selector from './EducationWidget.selector'

interface Props {
  navigation: MyCvTypes.MyCvNavigation
}

const EducationWidgetContainer = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const { userEducation, count } = useSelector(selector)

  return (
    <EducationWidget
      badgeColor={Colors.PrimaryRed}
      title={t('Education')}
      noDataMessage={t('Which school, university or college did you attend?')}
      viewRoute={HomeNavigationRoutes.Education}
      formRoute={HomeNavigationRoutes.EducationForm}
      userEducation={userEducation}
      count={count}
      navigation={navigation}
    />
  )
}

export default EducationWidgetContainer

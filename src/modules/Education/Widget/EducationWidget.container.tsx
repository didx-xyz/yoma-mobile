import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'
import { types as MyCvTypes } from '~/modules/MyCv'
import { UserQualificationsWidget } from '~/modules/UserQualifications'
import { Colors } from '~/styles'

import selector from './EducationWidget.selector'

interface Props {
  navigation: MyCvTypes.MyCvNavigation
}

const EducationWidgetContainer = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const { userQualifications, count } = useSelector(selector)

  useEffect(() => {
    console.log({ userQualifications })
  }, [userQualifications])

  return (
    <UserQualificationsWidget
      badgeColor={Colors.PrimaryRed}
      title={t('Education')}
      noDataMessage={t('Which school, university or college did you attend?')}
      viewRoute={HomeNavigationRoutes.Education}
      formRoute={HomeNavigationRoutes.EducationForm}
      userQualifications={userQualifications}
      count={count}
      navigation={navigation}
    />
  )
}

export default EducationWidgetContainer

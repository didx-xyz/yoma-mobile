import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import CvWidget, { CvWidgetList } from '../../../components/CvWidget'
import CvWidgetCredential, { types as CvWidgetCredentialTypes } from '../../../components/CvWidgetCredential'
import { Colors } from '../../../styles'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'

interface Props {
  userQualifications: CvWidgetCredentialTypes.NormalisedCvWidgetCredentialItems
  count: number
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MyCv>
}

const EducationWidget = ({ userQualifications, count, navigation }: Props) => {
  const { t } = useTranslation()
  return (
    <CvWidget
      count={count}
      badgeColor={Colors.PrimaryRed}
      title={t('Education')}
      fallback={t('Which school, university or college did you attend?')}
      onEdit={() => {
        navigation.navigate(HomeNavigationRoutes.Education)
      }}
    >
      <CvWidgetList
        data={userQualifications}
        onViewAll={() => {
          navigation.navigate(HomeNavigationRoutes.Education)
        }}
        RenderItem={CvWidgetCredential}
      />
    </CvWidget>
  )
}
export default EducationWidget

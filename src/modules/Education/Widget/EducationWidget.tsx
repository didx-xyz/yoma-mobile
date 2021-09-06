import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import CvWidget, { CvWidgetCredential, CvWidgetList, types as CvWidgetTypes } from '../../../components/CvWidget'
import { Colors } from '../../../styles'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'

interface Props {
  qualifications: CvWidgetTypes.NormalisedCvWidgetCredentialItems
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MyCv>
}

const EducationWidget = ({ qualifications, navigation }: Props) => {
  const { t } = useTranslation()
  return (
    <CvWidget
      count={qualifications.ids.length}
      badgeColor={Colors.PrimaryRed}
      title={t('Education')}
      fallback={t('Which school, university or college did you attend?')}
      onEdit={() => {
        navigation.navigate(HomeNavigationRoutes.Education)
      }}
    >
      <CvWidgetList
        data={qualifications}
        onViewAll={() => {
          navigation.navigate(HomeNavigationRoutes.Education)
        }}
        RenderItem={CvWidgetCredential}
      />
    </CvWidget>
  )
}
export default EducationWidget

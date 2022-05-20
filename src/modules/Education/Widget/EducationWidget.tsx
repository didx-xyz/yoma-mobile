import React from 'react'
import { useTranslation } from 'react-i18next'

import CvWidget, { CvWidgetList } from '~/components/CvWidget'
import CvWidgetCredential, { types as CvWidgetCredentialTypes } from '~/components/CvWidgetCredential'
import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'
import { types as MyCvTypes } from '~/modules/MyCv'
import { Colors } from '~/styles'

interface Props {
  userQualifications: CvWidgetCredentialTypes.NormalisedCvWidgetCredentialItems
  count: number
  navigation: MyCvTypes.MyCvNavigation
}

const EducationWidget = ({ userQualifications, count, navigation }: Props) => {
  const { t } = useTranslation()
  return (
    <CvWidget
      count={count}
      badgeColor={Colors.PrimaryRed}
      title={t('Education')}
      noDataMessage={t('Which school, university or college did you attend?')}
      onAction={() => {
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

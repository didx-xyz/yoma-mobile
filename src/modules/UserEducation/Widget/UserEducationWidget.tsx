import React from 'react'

import CvWidget, { CvWidgetList } from '~/components/CvWidget'
import CvWidgetCredential, { types as CvWidgetCredentialTypes } from '~/components/CvWidgetCredential'
import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'
import { types as MyCvTypes } from '~/modules/MyCv'
import { Colors } from '~/styles'

interface UserEducationWidgetProps {
  userEducation: CvWidgetCredentialTypes.NormalisedCvWidgetCredentialItems
  count: number
  title: string
  badgeColor: Colors
  formRoute: HomeNavigationRoutes
  viewRoute: HomeNavigationRoutes
  noDataMessage: string
  navigation: MyCvTypes.MyCvNavigation
}

const UserEducationWidget = ({
  userEducation,
  count,
  badgeColor,
  title,
  formRoute,
  viewRoute,
  noDataMessage,
  navigation,
}: UserEducationWidgetProps) => (
  <CvWidget
    count={count}
    badgeColor={badgeColor}
    title={title}
    noDataMessage={noDataMessage}
    onActionPress={() => {
      navigation.navigate(formRoute)
    }}
  >
    <CvWidgetList data={userEducation} viewRoute={viewRoute} navigation={navigation} RenderItem={CvWidgetCredential} />
  </CvWidget>
)
export default UserEducationWidget

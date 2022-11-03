import React from 'react'

import CvWidget, { CvWidgetList } from '~/components/CvWidget'
import CvWidgetCredential, { types as CvWidgetCredentialTypes } from '~/components/CvWidgetCredential'
import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'
import { types as MyCvTypes } from '~/modules/MyCv'
import { Colors } from '~/styles'

interface Props {
  userQualifications: CvWidgetCredentialTypes.NormalisedCvWidgetCredentialItems
  count: number
  title: string
  badgeColor: Colors
  formRoute: HomeNavigationRoutes
  viewRoute: HomeNavigationRoutes
  noDataMessage: string
  navigation: MyCvTypes.MyCvNavigation
}

const UserQualificationsWidget = ({
  userQualifications,
  count,
  badgeColor,
  title,
  formRoute,
  viewRoute,
  noDataMessage,
  navigation,
}: Props) => (
  <CvWidget
    count={count}
    badgeColor={badgeColor}
    title={title}
    noDataMessage={noDataMessage}
    onActionPress={() => {
      navigation.navigate(formRoute)
    }}
  >
    <CvWidgetList
      data={userQualifications}
      viewRoute={viewRoute}
      navigation={navigation}
      RenderItem={CvWidgetCredential}
    />
  </CvWidget>
)
export default UserQualificationsWidget

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'

import CvView, { CvViewList } from '~/components/CvView'
import CvViewCredential, { types as CvViewCredentialTypes } from '~/components/CvViewCredential'
import { HomeNavigatorParamsList } from '~/modules/HomeNavigation/HomeNavigation.types'

interface Props {
  title: string
  noDataMessage: string
  onAdd: () => void
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList>
  userQualifications: CvViewCredentialTypes.CvViewCredentialsData
}
const UserQualificationsView = ({ title, noDataMessage, onAdd, navigation, userQualifications }: Props) => (
  <CvView title={title} noDataMessage={noDataMessage} onAction={onAdd} navigation={navigation}>
    <CvViewList data={userQualifications} RenderItem={CvViewCredential} />
  </CvView>
)

export default UserQualificationsView

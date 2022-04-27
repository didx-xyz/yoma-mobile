import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import CvView, { CvViewList } from '~/components/CvView'
import CvViewCredential, { types as CvViewCredentialTypes } from '~/components/CvViewCredential'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'

interface Props {
  onAdd: () => void
  userQualifications: CvViewCredentialTypes.CvViewCredentialsData
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Education>
}
const EducationView = ({ onAdd, navigation, userQualifications }: Props) => {
  const { t } = useTranslation()

  return (
    <CvView
      title={t('Education')}
      noDataMessage={t('Which school, university or college did you attend?')}
      onAdd={onAdd}
      navigation={navigation}
    >
      <CvViewList data={userQualifications} RenderItem={CvViewCredential} />
    </CvView>
  )
}

export default EducationView

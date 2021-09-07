import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import CvView, { CvViewCredentialTypes, CvViewList } from '../../../components/CvView'
import CvViewCredential from '../../../components/CvView/Credential'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'

interface Props {
  onAdd: () => void
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Education>
  qualifications: CvViewCredentialTypes.CvViewCredentialsData
}
const EducationView = ({ onAdd, navigation, qualifications }: Props) => {
  const { t } = useTranslation()

  return (
    <CvView
      title={t('Education')}
      noDataMessage={t('Which school, university or college did you attend?')}
      onAdd={onAdd}
      navigation={navigation}
    >
      <CvViewList data={qualifications} RenderItem={CvViewCredential} />
    </CvView>
  )
}

export default EducationView

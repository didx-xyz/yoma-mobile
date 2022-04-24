import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import CvView, { CvViewCredentialTypes, CvViewList } from '../../../components/CvView'
import CvViewCredential from '../../../components/CvViewCredential'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'

interface Props {
  onAdd: () => void
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Experience>
  userJobs: CvViewCredentialTypes.CvViewCredentialsData
}

const ExperienceView = ({ userJobs, navigation, onAdd }: Props) => {
  const { t } = useTranslation()
  return (
    <CvView
      title={t('Experience')}
      noDataMessage={t('Where do you currently work?')}
      onAdd={onAdd}
      navigation={navigation}
    >
      <CvViewList data={userJobs} RenderItem={CvViewCredential} />
    </CvView>
  )
}

export default ExperienceView

import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import CvView, { CvViewCredentialTypes, CvViewList } from '../../../components/CvView'
import CvViewCredential from '../../../components/CvView/Credential'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'

interface Props {
  onAdd: () => void
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Experience>
  jobs: CvViewCredentialTypes.CvViewCredentialsData
}

const ExperienceView = ({ jobs, navigation, onAdd }: Props) => {
  const { t } = useTranslation()
  return (
    <CvView
      title={t('Experience')}
      noDataMessage={t('Where do you currently work?')}
      onAdd={onAdd}
      navigation={navigation}
    >
      <CvViewList data={jobs} RenderItem={CvViewCredential} />
    </CvView>
  )
}

export default ExperienceView

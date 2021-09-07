import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import CvView, { CvViewCredential, CvViewCredentialTypes, CvViewList } from '../../../components/CvView'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'

interface Props {
  onAdd: () => void
  challenges: CvViewCredentialTypes.CvViewCredentialsData
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.CompletedChallenges>
}

const CompletedChallengesView = ({ challenges, onAdd, navigation }: Props) => {
  const { t } = useTranslation()
  return (
    <CvView
      title={t('Challenges')}
      noDataMessage={t('Have you completed any challenges yet?')}
      onAdd={onAdd}
      navigation={navigation}
    >
      <CvViewList data={challenges} RenderItem={CvViewCredential} />
    </CvView>
  )
}

export default CompletedChallengesView

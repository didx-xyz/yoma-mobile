import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import CvView, { CvViewList } from '../../../components/CvView'
import CvViewCredential, { types as CvViewCredentialTypes } from '../../../components/CvViewCredential'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'

interface Props {
  onAdd: () => void
  userChallenges: CvViewCredentialTypes.CvViewCredentialsData
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.CompletedChallenges>
}

const CompletedChallengesView = ({ userChallenges, onAdd, navigation }: Props) => {
  const { t } = useTranslation()
  return (
    <CvView
      title={t('Challenges')}
      noDataMessage={t('Have you completed any challenges yet?')}
      onAdd={onAdd}
      navigation={navigation}
    >
      <CvViewList data={userChallenges} RenderItem={CvViewCredential} />
    </CvView>
  )
}

export default CompletedChallengesView

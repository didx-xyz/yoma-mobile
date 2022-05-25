import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import CvView, { CvViewList } from '~/components/CvView'
import CvViewCredential, { types as CvViewCredentialTypes } from '~/components/CvViewCredential'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'

interface Props {
  onAdd: () => void
  userChallenges: CvViewCredentialTypes.CvViewCredentialsData
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.CompletedChallenges>
}

const CompletedChallengesView = ({ onAdd, userChallenges, navigation }: Props) => {
  const { t } = useTranslation()

  return (
    <CvView
      title={t('Challenges')}
      noDataMessage={t('Have you completed any challenges yet?')}
      onAction={onAdd}
      navigation={navigation}
    >
      <CvViewList data={userChallenges} RenderItem={CvViewCredential} />
    </CvView>
  )
}

export default CompletedChallengesView

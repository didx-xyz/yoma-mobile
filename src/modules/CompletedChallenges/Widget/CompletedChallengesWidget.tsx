import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import CvCard, { CvCardListBody } from '../../../components/CvCard'
import UserCredentialItem from '../../../components/UserCredentialItem'
import { Colors } from '../../../styles'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import { NormalisedUserChallengeItem } from '../../UserChallenges/UserChallenges.types'

interface Props {
  challenges: NormalisedUserChallengeItem
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MyCv>
}
const CompletedChallengesWidget = ({ challenges, navigation }: Props) => {
  const { t } = useTranslation()
  return (
    <CvCard
      count={challenges.ids.length}
      badgeColor={Colors.SecondaryPurple}
      title={t('Completed challenges')}
      fallback={t('Have you completed any challenges yet?')}
      onEdit={() => {
        navigation.navigate(HomeNavigationRoutes.UserChallenges)
      }}
    >
      <CvCardListBody
        data={challenges}
        onViewAll={() => {
          navigation.navigate(HomeNavigationRoutes.UserChallenges)
        }}
        Item={UserCredentialItem}
      />
    </CvCard>
  )
}
export default CompletedChallengesWidget

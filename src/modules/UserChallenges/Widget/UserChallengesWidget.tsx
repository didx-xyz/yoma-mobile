import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import CvCard, { CvCardListBody } from '../../../components/CvCard'
import { Colors } from '../../../styles'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import UserChallengeItem from '../Item'
import { NormalisedUserChallengeItems } from '../UserChallenges.types'

interface Props {
  challenges: NormalisedUserChallengeItems
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.DigitalCv>
}
const UserChallengesWidget = ({ challenges, navigation }: Props) => {
  const { t } = useTranslation()
  return (
    <CvCard
      count={challenges.ids.length}
      badgeColor={Colors.secondaryPurple}
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
        Item={UserChallengeItem}
      />
    </CvCard>
  )
}
export default UserChallengesWidget

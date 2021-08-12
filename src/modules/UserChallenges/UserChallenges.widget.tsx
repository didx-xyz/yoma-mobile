import React from 'react'
import { useTranslation } from 'react-i18next'

import CvCard, { CvCardListBody } from '../../components/CvCard'
import { Colors } from '../../styles'
import UserChallengeItem from './UserChallengeItem'
import { NormalisedUserChallenges } from './UserChallenges.types'

interface Props {
  challenges: NormalisedUserChallenges
}
const UserChallengesWidget = ({ challenges }: Props) => {
  const { t } = useTranslation()

  return (
    <CvCard
      count={challenges.ids.length}
      badgeColor={Colors.secondaryPurple}
      title={t('Completed challenges')}
      fallback={t('Have you completed any challenges yet?')}
      onEdit={() => {
        console.log('edit challenges')
      }}
    >
      <CvCardListBody
        data={challenges}
        onViewAll={() => {
          console.log('handle view all')
        }}
        Item={UserChallengeItem}
      />
    </CvCard>
  )
}
export default UserChallengesWidget

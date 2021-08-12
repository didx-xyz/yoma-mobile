import React from 'react'
import { useTranslation } from 'react-i18next'

import CvCard, { CvCardListBody } from '../../components/CvCard'
import { Colors } from '../../styles'
import UserChallengeItem from './UserChallengeItem'

const mockData: any[] = [
  { id: 'id1', name: 'A NAME', startDate: '10 April 2020', avatarUrl: '', isValidated: false },
  { id: 'id2', name: 'B NAME', startDate: '11 May 2020', avatarUrl: '', isValidated: false },
  { id: 'id3', name: 'C NAME', startDate: '12 June 2020', avatarUrl: '', isValidated: false },
  { id: 'id4', name: 'D NAME', startDate: '13 July 2020', avatarUrl: '', isValidated: false },
]

interface Props {}
const UserChallengesWidget = ({}: Props) => {
  const { t } = useTranslation()

  return (
    <CvCard
      count={mockData.length}
      badgeColor={Colors.secondaryPurple}
      title={t('Completed challenges')}
      fallback={t('Have you completed any challenges yet?')}
      onEdit={() => {
        console.log('edit challenges')
      }}
    >
      <CvCardListBody
        data={mockData}
        onViewAll={() => {
          console.log('handle view all')
        }}
        Item={UserChallengeItem}
      />
    </CvCard>
  )
}
export default UserChallengesWidget

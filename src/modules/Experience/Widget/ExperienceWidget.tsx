import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import CvCard, { CvCardListBody } from '../../../components/CvCard'
import UserCredentialItem from '../../../components/UserCredentialItem'
import { Colors } from '../../../styles'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import { NormalisedUserJobs } from '../../UserJobs/UserJobs.types'

interface Props {
  userJobs: NormalisedUserJobs
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MyCv>
}
const ExperienceWidget = ({ userJobs, navigation }: Props) => {
  const { t } = useTranslation()
  return (
    <CvCard
      count={userJobs.ids.length}
      badgeColor={Colors.SecondaryPurple}
      title={t('Experience')}
      fallback={t('Where do you currently work?')}
      onEdit={() => {
        navigation.navigate(HomeNavigationRoutes.Experience)
      }}
    >
      <CvCardListBody
        data={userJobs}
        onViewAll={() => {
          navigation.navigate(HomeNavigationRoutes.Experience)
        }}
        Item={UserCredentialItem}
      />
    </CvCard>
  )
}
export default ExperienceWidget

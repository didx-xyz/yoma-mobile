import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import CvWidget, { CvWidgetList } from '~/components/CvWidget'
import CvWidgetSkill, { types as CvWidgetSkillTypes } from '~/components/CvWidgetSkill'
import { Colors } from '~/styles'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'

interface Props {
  userSkills: CvWidgetSkillTypes.NormalisedCvWidgetSkillItems
  count: number
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MyCv>
}
const MySkillsWidget = ({ userSkills, count, navigation }: Props) => {
  const { t } = useTranslation()
  return (
    <CvWidget
      count={count}
      badgeColor={Colors.PrimaryGreen}
      title={t('My skills')}
      noDataMessage={t('Tell us what you are great at.')}
      onEdit={() => {
        navigation.navigate(HomeNavigationRoutes.MySkills)
      }}
    >
      <CvWidgetList
        data={userSkills}
        onViewAll={() => {
          navigation.navigate(HomeNavigationRoutes.MySkills)
        }}
        maxDisplay={3}
        RenderItem={CvWidgetSkill}
      />
    </CvWidget>
  )
}
export default MySkillsWidget

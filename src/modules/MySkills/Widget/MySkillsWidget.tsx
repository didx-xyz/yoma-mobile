import React from 'react'
import { useTranslation } from 'react-i18next'

import CvWidget, { CvWidgetList } from '~/components/CvWidget'
import CvWidgetSkill, { types as CvWidgetSkillTypes } from '~/components/CvWidgetSkill'
import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'
import { types as MyCvTypes } from '~/modules/MyCv'
import { Colors } from '~/styles'

interface Props {
  userSkills: CvWidgetSkillTypes.NormalisedCvWidgetSkillItems
  count: number
  navigation: MyCvTypes.MyCvNavigation
}
const MySkillsWidget = ({ userSkills, count, navigation }: Props) => {
  const { t } = useTranslation()
  return (
    <CvWidget
      count={count}
      badgeColor={Colors.PrimaryGreen}
      title={t('My skills')}
      noDataMessage={t('Tell us what you are great at.')}
      onActionPress={() => {
        navigation.navigate(HomeNavigationRoutes.MySkillsForm)
      }}
    >
      <CvWidgetList
        data={userSkills}
        viewRoute={HomeNavigationRoutes.MySkills}
        navigation={navigation}
        maxDisplay={3}
        RenderItem={CvWidgetSkill}
      />
    </CvWidget>
  )
}
export default MySkillsWidget

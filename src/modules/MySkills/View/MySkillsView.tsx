import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import CvView, { CvViewList } from '../../../components/CvView'
import CvViewSkill, { types as CvViewSkillTypes } from '../../../components/CvViewSkill'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'

interface Props {
  onAdd: () => void
  userSkills: CvViewSkillTypes.NormalisedCvWidgetSkillItems
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MySkills>
}

const MySkillsView = ({ userSkills, onAdd, navigation }: Props) => {
  const { t } = useTranslation()
  return (
    <CvView
      title={t('Skills')}
      noDataMessage={t('Tell us what you are great at.')}
      onAdd={onAdd}
      navigation={navigation}
    >
      <CvViewList data={userSkills} RenderItem={CvViewSkill} />
    </CvView>
  )
}

export default MySkillsView

import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import CvView, { CvViewList } from '../../../components/CvView'
import CvViewSkill, { types as CvViewSkillTypes } from '../../../components/CvViewSkill'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import styles from './MySkillsView.styles'

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
      <View style={styles.container}>
        <View style={styles.content}>
          <CvViewList data={userSkills} RenderItem={CvViewSkill} />
        </View>
      </View>
    </CvView>
  )
}

export default MySkillsView

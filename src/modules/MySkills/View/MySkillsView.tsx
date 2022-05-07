import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import CvView, { CvViewList } from '~/components/CvView'
import CvViewSkill, { types as CvViewSkillTypes } from '~/components/CvViewSkill'
import { types as HomNavigationTypes } from '~/modules/HomeNavigation'

import styles from './MySkillsView.styles'

interface Props {
  onAdd: () => void
  userSkills: CvViewSkillTypes.NormalisedCvWidgetSkillItems
  navigation: NativeStackNavigationProp<
    HomNavigationTypes.HomeNavigatorParamsList,
    HomNavigationTypes.HomeNavigationRoutes.MySkills
  >
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

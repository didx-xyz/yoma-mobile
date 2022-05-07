import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Formik } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ButtonSave } from '~/components/Button'
import Card from '~/components/Card'
import Header from '~/components/Header'
import ViewContainer from '~/components/ViewContainer'
import { types as HomeNavigationTypes } from '~/modules/HomeNavigation'
import { SkillsFilterField } from '~/modules/Skills'

import { USER_SKILLS_INITIAL_VALUES } from './MySkillsForm.constants'
import styles from './MySkillsForm.styles'

interface Props {
  navigation: NativeStackNavigationProp<
    HomeNavigationTypes.HomeNavigatorParamsList,
    HomeNavigationTypes.HomeNavigationRoutes.MySkills
  >
  onSave: () => void
}
const MySkillsForm = ({ navigation, onSave }: Props) => {
  const { t } = useTranslation()

  return (
    <ViewContainer style={styles.container}>
      <Header navigation={navigation} headerText={t('Add skills')} actionItem={<ButtonSave onPress={onSave} />} />
      <Card>
        <Formik initialValues={USER_SKILLS_INITIAL_VALUES} onSubmit={onSave}>
          {() => <SkillsFilterField name="skills" placeholder={t('Skills developed:')} />}
        </Formik>
      </Card>
    </ViewContainer>
  )
}

export default MySkillsForm

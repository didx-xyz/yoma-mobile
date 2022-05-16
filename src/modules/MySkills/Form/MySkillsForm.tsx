import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FormikProps } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ButtonSave } from '~/components/Button'
import Card from '~/components/Card'
import Header from '~/components/Header'
import ViewContainer from '~/components/ViewContainer'
import { types as HomeNavigationTypes } from '~/modules/HomeNavigation'
import { SkillsFilterField } from '~/modules/Skills'

import styles from './MySkillsForm.styles'

interface Props {
  navigation: NativeStackNavigationProp<
    HomeNavigationTypes.HomeNavigatorParamsList,
    HomeNavigationTypes.HomeNavigationRoutes.MySkills
  >
  form: FormikProps<any>
}
const MySkillsForm = ({ navigation, form }: Props) => {
  const { t } = useTranslation()

  return (
    <ViewContainer style={styles.container}>
      <Header
        navigation={navigation}
        headerText={t('Add skills')}
        actionItem={<ButtonSave onPress={form.handleSubmit} />}
      />
      <Card>
        <SkillsFilterField name="skills" placeholder={t('Skills developed:')} />
      </Card>
    </ViewContainer>
  )
}

export default MySkillsForm

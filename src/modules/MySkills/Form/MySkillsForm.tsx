import { FormikProps } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ButtonSave } from '~/components/Button'
import Card from '~/components/Card'
import Header from '~/components/Header'
import ViewContainer from '~/components/ViewContainer'
import { MySkillsNavigation } from '~/modules/MySkills/types'
import SkillsSelectField from '~/modules/SkillSelectField'

import styles from './MySkillsForm.styles'
import { UserSkillsField } from './MySkillsForm.types'

interface Props {
  navigation: MySkillsNavigation
  form: FormikProps<UserSkillsField>
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
        <SkillsSelectField name="skills" label={t('forms.label.skills')} searchPlaceholder={t('Enter skill names')} />
      </Card>
    </ViewContainer>
  )
}

export default MySkillsForm

import { FormikProps } from 'formik'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'

import { ButtonSave } from '~/components/Button'
import Card from '~/components/Card'
import CheckBoxLabelled from '~/components/CheckBoxLabelled'
import DateRangeSelect from '~/components/DateRangeSelect'
import DropDown, { types as DropDownTypes } from '~/components/DropDown'
import FormLayout from '~/components/FormLayout'
import Header from '~/components/Header'
import Input from '~/components/Input'
import ViewContainer from '~/components/ViewContainer'
import SkillsSelectField from '~/modules/SkillSelectField'

import styles from './WorkExperienceForm.styles'
import { WorkExperienceFormNavigation } from './WorkExperienceForm.types'

interface Props {
  organisations: DropDownTypes.DropDownItem[]
  form: FormikProps<any>
  navigation: WorkExperienceFormNavigation
}

const WorkExperienceForm = ({ navigation, organisations, form }: Props) => {
  const { t } = useTranslation()
  const [isWorkingHere, setIsWorkingHere] = useState<boolean>(false)

  return (
    <ViewContainer style={styles.container}>
      <Header
        navigation={navigation}
        headerText={t('Work Experience')}
        actionItem={<ButtonSave onPress={form.handleSubmit} />}
      />
      <ScrollView>
        <Card>
          <FormLayout>
            <Input name={'title'} label={t('Title')} />
            <Input name="description" label={t('Description')} multiline />
            <DropDown
              items={organisations}
              name={'organisationId'}
              label={t('Company name')}
              searchable
              searchPlaceholder={t('Search organisation')}
            />
            <DateRangeSelect label={t('When did you work here?')} />
            <CheckBoxLabelled
              isSelected={isWorkingHere}
              label={t('I currently work here')}
              onPress={() => setIsWorkingHere(!isWorkingHere)}
            />
            <SkillsSelectField
              name="skillNames"
              searchPlaceholder={t('Search skills')}
              label={t('forms.label.skills')}
            />
          </FormLayout>
        </Card>
      </ScrollView>
    </ViewContainer>
  )
}

export default WorkExperienceForm

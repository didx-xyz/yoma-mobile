import { FormikProps } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'

import { ButtonSave } from '~/components/Button'
import DateRangeSelect from '~/components/DateRangeSelect'
import DropDown, { types as DropDownTypes } from '~/components/DropDown'
import FormGroup from '~/components/FormGroup'
import Header from '~/components/Header'
import Input from '~/components/Input'
import Upload from '~/components/Upload'
import ViewContainer from '~/components/ViewContainer'
import CountrySelectField from '~/modules/CountrySelectField/CountrySelectField.container'
import SkillsSelectField from '~/modules/SkillSelectField'

import { EducationNavigation } from '../types'
import styles from './EducationForm.styles'

interface Props {
  navigation: EducationNavigation
  organisationsDropDown: DropDownTypes.DropDownItem[]
  title: string
  form: FormikProps<any>
}

const EducationForm = ({ title, navigation, organisationsDropDown, form }: Props) => {
  const { t } = useTranslation()

  return (
    <ViewContainer style={styles.container}>
      <Header navigation={navigation} headerText={title} actionItem={<ButtonSave onPress={form.handleSubmit} />} />
      <ScrollView>
        <FormGroup>
          <DropDown
            items={organisationsDropDown}
            searchPlaceholder={t('Search schools')}
            label={t('School')}
            name="organisationId"
          />
          <Input name="title" label={t('Qualification type')} />
          <CountrySelectField
            name="countries"
            label={t('Country or region')}
            searchPlaceholder={t('Filter countries')}
            modalHeader={t('Select qualification country')}
          />
          <DateRangeSelect />
          <Input name="description" label={t('Description')} multiline />
          <SkillsSelectField name="skillNames" searchPlaceholder={t('Search skills')} label={t('forms.label.skills')} />
          <Upload name="certificate" label={t('Upload certification (if completed)')} />
        </FormGroup>
      </ScrollView>
    </ViewContainer>
  )
}

export default EducationForm

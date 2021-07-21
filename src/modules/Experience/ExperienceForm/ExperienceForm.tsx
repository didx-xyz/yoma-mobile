import { CheckBox, DatePicker, DropDown, DropDownTags, FormWrapper, InfoModal, Input, Spinner } from 'components'
import Text, { MetaLevels } from 'components/Typography'
import countries from 'constants/countries'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'
import { mapToDropDownArray } from 'utils/strings.utils'

import { ExperienceFormState } from '../Experience.types'
import { INITIAL_VALUES } from './ExperienceForm.constants'
import styles from './ExperienceForm.styles'
import { DropDownOrg, DropDownSkill } from './ExperienceForm.types'
import { ValidationSchema } from './ValidationSchema'

interface Props {
  fetchOrganizationsList: () => void
  fetchSkillsList: () => void
  skills: []
  organisations: []
  setFormState: ({ values: FormikValues, isValid: boolean }: ExperienceFormState) => void
}

const ExperienceForm = ({ setFormState, skills, organisations, fetchOrganizationsList, fetchSkillsList }: Props) => {
  const { t } = useTranslation()
  const [organisationsList, setOrganisationsList] = useState<DropDownOrg[]>([])
  const [isWorkingHere, setIsWorkingHere] = useState<boolean>(false)
  const [skillsList, setSkillsList] = useState<DropDownSkill[]>([])
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false)

  useEffect(() => {
    fetchOrganizationsList()
    fetchSkillsList()
  }, [fetchOrganizationsList, fetchSkillsList])

  useEffect(() => {
    setOrganisationsList(organisations)
  }, [organisations])

  useEffect(() => {
    setSkillsList(skills)
  }, [skills])

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      enableReinitialize
      validationSchema={ValidationSchema}
      validate={values => {
        ValidationSchema()
          .isValid(values)
          .then(isValid => {
            setFormState({ values, isValid })
          })
      }}
      onSubmit={() => {}}
    >
      {(formikHandlers: any) => (
        <FormWrapper>
          <InfoModal
            visible={showInfoModal}
            closeModal={() => setShowInfoModal(false)}
            infoText={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis mauris purus. Quisque malesuada ornare mauris sed feugiat. Cras lectus est, iaculis quis nulla cursus, finibus gravida massa. Donec condimentum porta nisi, eu egestas risus ullamcorper in. In et magna mauris. '
            }
          />
          <Spinner visible={formikHandlers.isSubmitting} />
          <Input name={'title'} label={t('Title')} handlers={formikHandlers} />
          <DropDown
            items={mapToDropDownArray(organisationsList, 'key', 'value')}
            name={'organisationName'}
            label={'Company name'}
            handlers={formikHandlers}
            searchPlaceholder={t('Search organisation')}
          />
          <DropDown
            items={mapToDropDownArray(countries, 'code', 'name')}
            name={'country'}
            label={'Country'}
            handlers={formikHandlers}
            searchPlaceholder={t('Search country')}
            placeholder={t('Country or region')}
          />
          <CheckBox
            isChecked={isWorkingHere}
            label={t('I currently work here')}
            onPress={() => setIsWorkingHere(!isWorkingHere)}
          />
          <View style={styles.row}>
            <DatePicker name={'startDate'} label={t('Start date')} handlers={formikHandlers} />
            <DatePicker name={'endDate'} label={t('End date')} handlers={formikHandlers} />
          </View>
          <Input name={'description'} label={t('Description')} handlers={formikHandlers} multiline />
          <DropDownTags
            items={mapToDropDownArray(skillsList, 'key', 'value')}
            multiple
            searchPlaceholder={t('Search skills')}
            label={t('Skills developed')}
            name={'skillNames'}
            handlers={formikHandlers}
          />
          <TouchableOpacity onPress={() => setShowInfoModal(true)}>
            <Text.Meta level={MetaLevels.smallBold} color={Colors.primaryGreen}>
              {t('Find inspiration on how to write a great profile.')}
            </Text.Meta>
          </TouchableOpacity>
        </FormWrapper>
      )}
    </Formik>
  )
}

export default ExperienceForm

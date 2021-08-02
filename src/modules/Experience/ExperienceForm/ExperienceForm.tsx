import { CheckBox, DatePicker, DropDown, FormWrapper, InfoModal, Input } from 'components'
import DropDownTags from 'components/DropDownTags'
import Text, { MetaLevels } from 'components/Typography'
import countries from 'constants/countries'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'
import { dropDownFromArray, mapToDropDownArray } from 'utils/strings.utils'

import { ExperienceFormState } from '../Experience.types'
import { INITIAL_VALUES } from './ExperienceForm.constants'
import styles from './ExperienceForm.styles'
import { DropDownList } from './ExperienceForm.types'
import { ValidationSchema } from './ValidationSchema'

interface Props {
  fetchSkillByName: (searchQuery: string) => void
  skills: []
  organisations: DropDownList[]
  setFormState: ({ values: FormikValues, isValid: boolean }: ExperienceFormState) => void
}

const ExperienceForm = ({ fetchSkillByName, setFormState, skills, organisations }: Props) => {
  const { t } = useTranslation()
  const [organisationsList, setOrganisationsList] = useState<DropDownList[]>([])
  const [skillsList, setSkillsList] = useState<string[]>([])
  const [isWorkingHere, setIsWorkingHere] = useState<boolean>(false)
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false)

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
      validateOnMount
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
          {/* <Spinner visible={formikHandlers.isSubmitting} /> */}
          <Input name={'title'} label={t('Title')} handlers={formikHandlers} />
          <DropDown
            items={mapToDropDownArray(organisationsList, 'key', 'value')}
            name={'organisationId'}
            label={'Company name'}
            handlers={formikHandlers}
            searchable
            searchPlaceholder={t('Search organisation')}
          />
          <DropDownTags
            items={mapToDropDownArray(countries, 'name', 'name')}
            name={'countries'}
            label={'Country'}
            multiple
            searchable
            min={1}
            max={1}
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
            <DatePicker name="startTime" label={t('Start date')} handlers={formikHandlers} />
            <DatePicker name="endTime" label={t('End date')} handlers={formikHandlers} />
          </View>
          <Input name={'description'} label={t('Description')} handlers={formikHandlers} multiline />
          <DropDownTags
            items={dropDownFromArray(skillsList)}
            multiple
            searchable
            searchPlaceholder={t('Search skills')}
            onChangeSearchText={fetchSkillByName}
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

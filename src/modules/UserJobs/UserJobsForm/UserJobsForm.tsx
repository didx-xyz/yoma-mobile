import { CheckBox, DatePicker, DropDown, FormWrapper, InfoModal, Input } from 'components'
import DropDownTags from 'components/DropDownTags'
import Text, { MetaLevels } from 'components/Typography'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'
import { mapToDropDownArray } from 'utils/strings.utils'

import { UserJobsFormState, UserJobsRequest } from '../UserJobs.types'
import styles from './UserJobsForm.styles'
import { DropDownList } from './UserJobsForm.types'
import { ValidationSchema } from './ValidationSchema'

interface Props {
  filterSkillsByValue: (value: string) => void
  skills: DropDownList[]
  organisations: DropDownList[]
  formValues: UserJobsRequest
  setFormState: ({ values: UserJobsRequest, isValid: boolean }: UserJobsFormState) => void
}

const UserJobsForm = ({ formValues, filterSkillsByValue, setFormState }: Props) => {
  const { t } = useTranslation()
  const [organisationsList] = useState<DropDownList[]>([])
  const [skillsList] = useState<DropDownList[]>([])
  const [isWorkingHere, setIsWorkingHere] = useState<boolean>(false)
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false)

  return (
    <Formik
      initialValues={formValues}
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
            items={mapToDropDownArray(skillsList, 'value', 'value')}
            multiple
            searchable
            searchPlaceholder={t('Search skills')}
            onChangeSearchText={filterSkillsByValue}
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

export default UserJobsForm

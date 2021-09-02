import { CheckBox, DatePicker, DropDown, FormWrapper, InfoModal, Input } from 'components'
import DropDownTags from 'components/DropDownTags'
import Text, { MetaLevels } from 'components/Typography'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'

import { DropDownList } from '../../../components/DropDown/DropDown.types'
import { UserJobFormFields, UserJobsFormState } from '../UserJobs.types'
import styles from './UserJobsForm.styles'
import { ValidationSchema } from './ValidationSchema'

interface Props {
  onFilterSkills: (value: string) => void
  skills: DropDownList[]
  organisations: DropDownList[]
  formValues: UserJobFormFields
  setFormState: ({ values: UserJobFormFields, isValid: boolean }: UserJobsFormState) => void
}

const UserJobsForm = ({ skills, organisations, formValues, onFilterSkills, setFormState }: Props) => {
  const { t } = useTranslation()
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
            items={organisations}
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
            items={skills}
            multiple
            searchable
            searchPlaceholder={t('Search skills')}
            onChangeSearchText={onFilterSkills}
            label={t('Skills developed')}
            name={'skillNames'}
            handlers={formikHandlers}
          />
          <TouchableOpacity onPress={() => setShowInfoModal(true)}>
            <Text.Meta level={MetaLevels.smallBold} color={Colors.PrimaryGreen}>
              {t('Find inspiration on how to write a great profile.')}
            </Text.Meta>
          </TouchableOpacity>
        </FormWrapper>
      )}
    </Formik>
  )
}

export default UserJobsForm

import { DropDown, Spinner, DatePicker, DropDownTags, InfoModal, Input, CheckBox } from 'components'
import Text, { MetaLevels, TextAlign } from 'components/Typography'
import countries from 'constants/countries'
import { Formik, FormikProps, FormikValues } from 'formik'
import { NavigationRoutes } from 'modules/Home/Home.routes'
import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'
import { mapToDropDownArray } from 'utils/strings.utils'

import { INITIAL_VALUES } from './ExperienceForm.constants'
import styles from './ExperienceForm.styles'
import { DropDownOrg } from './ExperienceForm.types'
import { getOrganizationsList, getSkillsList, submitForm } from './ExperienceForm.utils'
import { ValidationSchema } from './ValidationSchema'

interface Props {
  navigation: any
}

const ExperienceForm = forwardRef(({ navigation }: Props, ref) => {
  const { t } = useTranslation()
  const [organizations, setOrganizations] = useState<DropDownOrg[]>([])
  const [isWorkingHere, setIsWorkingHere] = useState<boolean>(false)
  const [skillsList, setSkillsList] = useState<DropDownOrg[]>([])
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false)

  const formRef = useRef<FormikProps<FormikValues>>()

  useEffect(() => {
    const getOrganizations = async () => {
      const organizationsList = await getOrganizationsList()
      setOrganizations(mapToDropDownArray(organizationsList.data))
    }
    getOrganizations()
  }, [])

  useEffect(() => {
    const getSkills = async () => {
      const skills = await getSkillsList()
      setSkillsList(mapToDropDownArray(skills.data, 'value'))
    }
    getSkills()
  }, [])

  useImperativeHandle(ref, () => ({
    handleSubmit() {
      if (formRef.current) {
        formRef.current.handleSubmit()
      }
    },
  }))

  return (
    <Formik
      innerRef={formRef}
      initialValues={INITIAL_VALUES}
      enableReinitialize
      validationSchema={ValidationSchema}
      onSubmit={async values => {
        await submitForm(values)
        navigation.navigate(NavigationRoutes.Home)
      }}
    >
      {formikHandlers => (
        <View style={styles.formView}>
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
            items={organizations}
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
          <Text.Meta level={MetaLevels.smallBold} color={Colors.primaryGreen} align={TextAlign.right}>
            {t('Use current location')}
          </Text.Meta>
          <CheckBox
            isChecked={isWorkingHere}
            label={t('I currently work here')}
            onPress={() => setIsWorkingHere(!isWorkingHere)}
          />
          <View style={styles.row}>
            <DatePicker
              onDateChange={(date: string) => {
                formikHandlers.handleChange('startDate')
                formikHandlers.handleBlur('startDate')
                formikHandlers.setFieldValue('startDate', date)
              }}
              value={formikHandlers.values.startDate}
              label={t('Start date')}
              isTouched={formikHandlers.touched.startDate}
              error={formikHandlers.errors.startDate}
              showTitle={formikHandlers.values.startDate !== ''}
            />
            <DatePicker
              onDateChange={(date: string) => {
                formikHandlers.handleChange('endDate')
                formikHandlers.handleBlur('endDate')
                formikHandlers.setFieldValue('endDate', date)
              }}
              value={formikHandlers.values.endDate}
              label={t('End date')}
              isTouched={formikHandlers.touched.endDate}
              error={formikHandlers.errors.endDate}
              showTitle={formikHandlers.values.endDate !== ''}
            />
          </View>
          <Input name={'description'} label={t('Description')} handlers={formikHandlers} multiline />
          <DropDownTags
            items={skillsList}
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
        </View>
      )}
    </Formik>
  )
})

export default ExperienceForm

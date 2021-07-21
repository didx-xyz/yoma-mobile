import { StackNavigationProp } from '@react-navigation/stack'
import { CheckBox, DatePicker, DropDown, DropDownTags, FormWrapper, InfoModal, Input, Spinner } from 'components'
import Text, { MetaLevels } from 'components/Typography'
import countries from 'constants/countries'
import { Formik, FormikProps, FormikValues } from 'formik'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from 'modules/HomeNavigation/HomeNavigation.types'
import { OrganisationResponsePayload } from 'modules/Organisations/Organisations.types'
import { SkillPayload } from 'modules/Skills/Skills.types'
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'
import { mapToDropDownArray } from 'utils/strings.utils'

import { INITIAL_VALUES } from './ExperienceForm.constants'
import styles from './ExperienceForm.styles'
import { DropDownOrg } from './ExperienceForm.types'
import { ValidationSchema } from './ValidationSchema'

interface Props {
  fetchOrganizationsList: () => void
  fetchSkillsList: () => void
  skills: SkillPayload[]
  organisations: OrganisationResponsePayload[]
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Experience>
}

const ExperienceForm = forwardRef(({ navigation, skills, organisations }: Props, ref) => {
  const { t } = useTranslation()
  const [organisationsList, setOrganisationsList] = useState<DropDownOrg[]>([])
  const [isWorkingHere, setIsWorkingHere] = useState<boolean>(false)
  const [skillsList, setSkillsList] = useState<DropDownOrg[]>([])
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false)

  const formRef = useRef<FormikProps<FormikValues>>()

  useEffect(() => {
    setOrganisationsList(organisations)
  }, [organisations])

  useEffect(() => {
    setSkillsList(skills)
  }, [skills])

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
        console.log('values', values)
        // await submitForm(values)
        navigation.navigate(HomeNavigationRoutes.Home)
      }}
    >
      {formikHandlers => (
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
            items={organisationsList}
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
        </FormWrapper>
      )}
    </Formik>
  )
})

export default ExperienceForm

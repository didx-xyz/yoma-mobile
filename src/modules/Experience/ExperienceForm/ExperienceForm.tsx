import { BlueHollowCircle, BlueTick } from 'assets/images'
import { CustomInput, DropDown, Spinner, DatePicker, DropDownTags, InfoModal, Optional } from 'components'
import Text, { MetaLevels, TextAlign } from 'components/Typography'
import { Formik } from 'formik'
import { NavigationRoutes } from 'modules/Home/Home.routes'
import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'
import { mapToDropDownArray } from 'utils/strings.utils'

import { INITIAL_VALUES } from './ExperienceForm.constants'
import styles from './ExperienceForm.styles'
import { DropDownOrg } from './ExperienceForm.types'
import { deleteSkill, getOrganizationsList, getSkillsList, submitForm } from './ExperienceForm.utils'
import { ValidationSchema } from './ValidationSchema'

interface Props {
  navigation: any
}

const ExperienceForm = forwardRef(({ navigation }: Props, ref) => {
  const { t } = useTranslation()
  const [organizations, setOrganizations] = useState<DropDownOrg[]>([])
  const [isWorkingHere, setIsWorkingHere] = useState(false)
  const [skillsList, setSkillsList] = useState<DropDownOrg[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [requestVerification, setRequestVerification] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)

  const formRef = useRef<string>()

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
      enableReinitialize={true}
      validationSchema={ValidationSchema}
      onSubmit={async values => {
        await submitForm(values)
        navigation.navigate(NavigationRoutes.Home)
      }}
    >
      {({ handleChange, handleBlur, values, touched, errors, isSubmitting, setFieldValue }) => (
        <View style={styles.formView}>
          <InfoModal
            visible={showInfoModal}
            closeModal={() => setShowInfoModal(false)}
            infoText={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis mauris purus. Quisque malesuada ornare mauris sed feugiat. Cras lectus est, iaculis quis nulla cursus, finibus gravida massa. Donec condimentum porta nisi, eu egestas risus ullamcorper in. In et magna mauris. '
            }
          />
          <Spinner visible={isSubmitting} />
          <CustomInput
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
            value={values.title}
            label={t('Title')}
            isTouched={touched.title}
            error={errors.title}
            showTitle={values.title !== ''}
          />
          <DropDown
            items={organizations}
            onChangeItem={itemValue => {
              handleChange('organisationName')
              handleBlur('organisationName')
              setFieldValue('organisationName', itemValue.label)
              setFieldValue('organisationId', itemValue.value)
            }}
            style={styles.formDropDown}
            searchable={true}
            searchablePlaceholder="Search organization"
            searchablePlaceholderTextColor={Colors.menuGrey}
            placeholderStyle={styles.placeholder}
            placeholder={t('Company name')}
            isTouched={touched.organisationName}
            error={errors.organisationName}
            fieldName={t('Company Name')}
            showTitle={values.organisationName !== ''}
          />
          <CustomInput
            onChangeText={handleChange('country')}
            onBlur={handleBlur('country')}
            value={values.country}
            label={t('Country or region')}
            isTouched={touched.country}
            error={errors.country}
            showTitle={values.title !== ''}
          />
          <Text.Meta level={MetaLevels.smallBold} color={Colors.primaryGreen} align={TextAlign.right}>
            {t('Use current location')}
          </Text.Meta>
          <View style={styles.checkBoxView}>
            <TouchableOpacity
              onPress={() => {
                setIsWorkingHere(!isWorkingHere)
              }}
              style={styles.checkBox}
            >
              <Optional condition={isWorkingHere} fallback={<BlueHollowCircle />}>
                <BlueTick />
              </Optional>
            </TouchableOpacity>
            <Text.Body>{t('I currently work here')}</Text.Body>
          </View>
          <View style={styles.datePickersRowView}>
            <DatePicker
              onChangeDate={(date: string) => {
                handleChange('startDate')
                handleBlur('startDate')
                setFieldValue('startDate', date)
              }}
              value={values.startDate}
              label={t('Start date')}
              isTouched={touched.startDate}
              error={errors.startDate}
              showTitle={values.startDate !== ''}
            />
            <DatePicker
              onChangeDate={(date: string) => {
                handleChange('endDate')
                handleBlur('endDate')
                setFieldValue('endDate', date)
              }}
              value={values.endDate}
              label={t('End date')}
              isTouched={touched.endDate}
              error={errors.endDate}
              showTitle={values.endDate !== ''}
            />
          </View>
          <CustomInput
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            value={values.description}
            label={t('Description')}
            isTouched={touched.description}
            error={errors.description}
            showTitle={values.description !== ''}
          />
          <DropDownTags
            items={skillsList}
            multiple={true}
            multipleText={t('Skills developed %d')}
            min={0}
            max={10}
            searchable={true}
            searchablePlaceholder={t('Search skills')}
            searchablePlaceholderTextColor={Colors.menuGrey}
            placeholder={t('Skills developed')}
            fieldName={t('Skills developed')}
            placeholderStyle={styles.placeholder}
            showTitle={values.skillNames.length > 0}
            defaultValue={selectedSkills}
            onChangeItem={item => {
              setSelectedSkills(item)
              handleChange('skillNames')
              handleBlur('skillNames')
              setFieldValue('skillNames', selectedSkills)
            }}
            tags={selectedSkills}
            onDelete={tag => {
              const filteredSkills = deleteSkill(selectedSkills, tag)
              setSelectedSkills(filteredSkills)
              setFieldValue('skillNames', filteredSkills)
            }}
          />
          <View style={[styles.checkBoxView]}>
            <TouchableOpacity
              onPress={() => {
                setRequestVerification(!requestVerification)
                setFieldValue('requestVerificationInd', requestVerification)
              }}
              style={styles.checkBox}
            >
              <Optional condition={requestVerification} fallback={<BlueHollowCircle />}>
                <BlueTick />
              </Optional>
            </TouchableOpacity>
            <Text.Body>{t('Request verification of employment from company')}</Text.Body>
          </View>
          <TouchableOpacity onPress={() => setShowInfoModal(true)} style={styles.bottomView}>
            <Text.Meta level={MetaLevels.smallBold} color={Colors.primaryGreen} style={styles.bottomText}>
              {t('Find inspiration on how to write a great profile.')}
            </Text.Meta>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  )
})

export default ExperienceForm

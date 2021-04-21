import api from 'api'
import { BlueHollowCircle, BlueTick } from 'assets/images'
import { CustomInput, DropDown, Spinner, DatePicker, DropDownTags, InfoModal, Optional } from 'components'
import Text, { MetaLevels, TextAlign } from 'components/Typography'
import { Formik } from 'formik'
import { USER_ID } from 'helpers/helpers'
import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'
import { mapToSelect } from 'utils/strings.utils'

import { INITIAL_VALUES } from './ExperienceForm.constants'
import styles from './ExperienceForm.styles'
import { DropDownOrg, ExperienceValue } from './ExperienceForm.types'
import { ValidationSchema } from './ValidationSchema'

interface Props {
  navigation: any
}

const ExperienceForm = forwardRef(({ navigation }: Props, ref) => {
  const { t } = useTranslation()
  const [organizations, setOrganizations] = useState<DropDownOrg[]>([])
  const [present, setPresent] = useState(false)
  const [skillsList, setSkillsList] = useState<{ label: string; value: string }[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [requestVerification, setRequestVerification] = useState(false)
  const [infoModal, setInfoModal] = useState(false)

  const formRef = useRef<string>()

  useEffect(() => {
    getOrganizationsList()
    getSkillsList()
  }, [])

  const getOrganizationsList = async () => {
    const response = await api.digitalCv.organisations.getKeyNames()
    setOrganizations(mapToSelect(response.data, 'key', 'value'))
  }

  useImperativeHandle(ref, () => ({
    handleSubmit() {
      if (formRef.current) {
        formRef.current.handleSubmit()
      }
    },
  }))

  const getSkillsList = async () => {
    const response = await api.digitalCv.skills.getKeyNames()
    // const skills = response.data
    setSkillsList(mapToSelect(response.data, 'value', 'value'))
  }

  const createJob = async (values: ExperienceValue, organisationId: string) => {
    const response = await api.digitalCv.workExperience.create({
      title: values.title,
      description: values.description,
      organisationId: organisationId,
      skillNames: values.skillNames,
    })
    return response.data
  }

  const createCredential = async (job: any, values: ExperienceValue) => {
    const response = await api.users.credentials.create(USER_ID, {
      type: 'Job',
      credentialItemId: job.id,
      startTime: values.startDate,
      endTime: values.endDate,
      requestVerification: values.requestVerificationInd,
    })
    return response.data
  }
  const deleteSkill = (tag: string) => {
    const remainingSkills = selectedSkills.filter(result => result !== tag)
    setSelectedSkills(remainingSkills)
  }

  return (
    <Formik
      innerRef={formRef}
      initialValues={INITIAL_VALUES}
      enableReinitialize={true}
      validationSchema={ValidationSchema}
      onSubmit={async values => {
        try {
          const job = await createJob(values, values.organisationId)
          await createCredential(job, values)
          navigation.navigate('Home')
        } catch (err) {
          console.error(err)
        }
      }}
    >
      {({ handleChange, handleBlur, values, touched, errors, isSubmitting, setFieldValue }) => (
        <View style={styles.formView}>
          <InfoModal
            visible={infoModal}
            closeModal={() => setInfoModal(false)}
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
            touched={touched.title}
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
            placeholderStyle={styles.placeholderStyle}
            placeholder={t('Company name')}
            touched={touched.organisationName}
            error={errors.organisationName}
            fieldName={t('Company Name')}
            showTitle={values.organisationName !== ''}
          />
          <CustomInput
            onChangeText={handleChange('country')}
            onBlur={handleBlur('country')}
            value={values.country}
            label={t('Country or region')}
            touched={touched.country}
            error={errors.country}
            showTitle={values.title !== ''}
          />
          <Text.Meta level={MetaLevels.smallBold} color={Colors.primaryGreen} align={TextAlign.right}>
            {t('Use current location')}
          </Text.Meta>
          <View style={styles.checkBoxView}>
            <TouchableOpacity
              onPress={() => {
                setPresent(!present)
              }}
              style={styles.checkBox}
            >
              <Optional condition={present} fallback={<BlueHollowCircle />}>
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
              touched={touched.startDate}
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
              touched={touched.endDate}
              error={errors.endDate}
              showTitle={values.endDate !== ''}
            />
          </View>
          <CustomInput
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            value={values.description}
            label={t('Description')}
            touched={touched.description}
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
            searchablePlaceholderTextColor="gray"
            placeholder={t('Skills developed')}
            fieldName={t('Skills developed')}
            placeholderStyle={styles.placeholderStyle}
            showTitle={values.skillNames.length > 0}
            defaultValue={selectedSkills}
            onChangeItem={item => {
              setSelectedSkills(item)
              handleChange('skillNames')
              handleBlur('skillNames')
              setFieldValue('skillNames', selectedSkills)
            }}
            tags={selectedSkills}
            deleteItem={deleteSkill}
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
          <TouchableOpacity onPress={() => setInfoModal(true)} style={styles.bottomView}>
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

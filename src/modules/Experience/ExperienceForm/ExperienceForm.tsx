import api from 'api'
import { BlueHollowCircle, BlueTick } from 'assets/images'
import { CustomInput, DropDown, Spinner, DatePicker, DropDownTags } from 'components'
import Text, { MetaLevels, TextAlign } from 'components/Typography'
import countries from 'constants/countries'
import { Formik } from 'formik'
import { USER_ID } from 'helpers/helpers'
import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity, View } from 'react-native'
import { colors, Colors } from 'styles'
import mapToSelect from 'utils/mapToSelect'

import styles from './ExperienceForm.styles'
import ValidationSchema from './ValidationSchema'

interface Props {
  navigation: any
}

const INITIAL_VALUES = {
  // details
  title: '',
  description: '',
  id: '',
  // startDate: '2021-04-09T05:52:02.872Z',
  // endDate: '2021-04-09T05:52:02.872Z',
  startDate: '',
  endDate: '',
  verifiedAt: null,

  // country
  countryAlpha2: '',
  // skills developed
  skillNames: [],

  // organisation
  organisationId: '',
  organisationName: '',
  organisationWebsite: '',
  primaryContactName: '',
  primaryContactEmail: '',

  noResultInd: false,
  requestVerificationInd: false,
}

const ExperienceForm = forwardRef(({ navigation }: Props, ref) => {
  const { t } = useTranslation()
  const [country, setCountry] = useState('')
  const [organizations, setOrganizations] = useState([])
  const [dropdown, setDropDown] = useState(false)
  const [present, setPresent] = useState(false)
  const [skillsList, setSkillsList] = useState([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [requestVerification, setRequestVerification] = useState(false)

  const formRef = useRef<any>()

  useEffect(() => {
    getOrganizationsList()
    getSkillsList()
  }, [])

  const getOrganizationsList = async () => {
    const response = await api.digitalCv.organisations.getKeyNames()
    const orgList: any = []
    response.data.forEach((org: any) => {
      const orgObj = {
        label: org.value,
        value: org.key,
      }
      orgList.push(orgObj)
    })
    setOrganizations(orgList)
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
    if (response.data) {
      const skills = response.data
      setSkillsList(mapToSelect(skills, 'value', 'value'))
    }
  }

  const createJob = async (values: any, organisationId: string) => {
    const response = await api.digitalCv.workExperience.create({
      title: values.title,
      description: values.description,
      organisationId: organisationId,
      skillNames: values.skillNames,
    })
    return response.data
  }

  const createCredential = async (job: any, values: any) => {
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
      onSubmit={async (values, actions) => {
        console.log('values', values)
        try {
          const job = await createJob(values, values.organisationId)
          await createCredential(job, values)
          navigation.navigate('Home')
        } catch (err) {
          console.error(err)
        }
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isSubmitting, setFieldValue }) => (
        <View style={styles.formView}>
          <Spinner visible={isSubmitting} />
          <CustomInput
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
            value={values.title}
            label={t('Title')}
            touched={touched.title}
            error={errors.title}
            showTitle={values.title !== '' ? true : false}
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
            placeholderStyle={{ color: colors[Colors.menuGrey] }}
            placeholder={t('Company name')}
            touched={touched.organisationName}
            error={errors.organisationName}
            fieldName={t('Company Name')}
            showTitle={values.organisationName != '' ? true : false}
          />
          <CustomInput
            onChangeText={handleChange('countryAlpha2')}
            onBlur={handleBlur('countryAlpha2')}
            value={country}
            label={t('Country or Region')}
            touched={touched.countryAlpha2}
            error={errors.countryAlpha2}
            showTitle={values.title !== '' ? true : false}
          />
          {dropdown ? (
            <DropDown
              items={countries.map(c => ({
                label: c.name,
                value: c.code,
              }))}
              onChangeItem={itemValue => {
                handleChange('countryAlpha2')
                handleBlur('countryAlpha2')
                setFieldValue('countryAlpha2', itemValue.value)
                setCountry(itemValue.label)
                setDropDown(false)
              }}
              defaultValue={country}
              searchable={true}
              searchablePlaceholder={t('Search for country')}
              searchablePlaceholderTextColor={colors[Colors.menuGrey]}
              placeholder={t('country')}
              touched={touched.countryAlpha2}
              error={errors.countryAlpha2}
              isVisible={dropdown}
            />
          ) : null}
          <Text.Meta
            level={MetaLevels.smallBold}
            color={Colors.primaryGreen}
            align={TextAlign.right}
            style={styles.useLocationText}
            onPress={() => setDropDown(true)}
          >
            {t('Use current location')}
          </Text.Meta>
          <View style={styles.checkBoxView}>
            <TouchableOpacity
              onPress={() => {
                setPresent(!present)
              }}
              style={styles.checkBox}
            >
              {present ? <BlueTick /> : <BlueHollowCircle />}
            </TouchableOpacity>
            <Text.Body>{t('I currently work here')}</Text.Body>
          </View>
          <View style={styles.datePickersRowView}>
            <DatePicker
              onChangeDate={(date: string) => {
                console.log(date)
                handleChange('startDate')
                handleBlur('startDate')
                setFieldValue('startDate', date)
              }}
              value={values.startDate}
              label={t('Start date')}
              touched={touched.startDate}
              error={errors.startDate}
              viewStyle={{ width: '40%' }}
              showTitle={values.startDate !== '' ? true : false}
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
              viewStyle={{ width: '40%' }}
              showTitle={values.endDate !== '' ? true : false}
            />
          </View>
          <CustomInput
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            value={values.description}
            label={t('Description')}
            touched={touched.description}
            error={errors.description}
            showTitle={values.description !== '' ? true : false}
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
            showTitle={values.skillNames.length > 0 ? true : false}
            defaultValue={selectedSkills}
            onChangeItem={item => {
              setSelectedSkills(item)
              handleChange('skillNames')
              handleBlur('skillNames')
              setFieldValue('skillNames', selectedSkills)
            }}
            tags={selectedSkills}
            deleteItem={deleteSkill}
            touched={touched.skillNames}
            error={errors.skillNames}
          />
          <View style={[styles.checkBoxView]}>
            <TouchableOpacity
              onPress={() => {
                setRequestVerification(!requestVerification)
                setFieldValue('requestVerificationInd', requestVerification)
              }}
              style={styles.checkBox}
            >
              {requestVerification ? <BlueTick /> : <BlueHollowCircle />}
            </TouchableOpacity>
            <Text.Body>{t('Request verification of employment from company')}</Text.Body>
          </View>
        </View>
      )}
    </Formik>
  )
})

export default ExperienceForm

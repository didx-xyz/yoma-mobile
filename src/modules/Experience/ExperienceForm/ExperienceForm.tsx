import api from 'api'
import { BlueTick } from 'assets/Images'
import { DropDown, Spinner } from 'components'
import CustomInput from 'components/CustomInput/CustomInput'
import DateTimePicker from 'components/DatePicker/DatePicker'
import DropDownTags from 'components/DropDownTags/DropDownTags'
import countries from 'constants/countries'
import { Formik } from 'formik'
import { USER_ID } from 'helpers/helpers'
import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react'
import { Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { FontFamily, TextStyles } from 'styles'
import fontStyles from 'styles/font.styles'
import mapToSelect from 'utils/mapToSelect'

import styles from './ExperienceForm.styles'
import ValidationSchema from './ValidationSchema'

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

const rendertag = ({ tag, index, onPress }: any) => {
  return (
    <TouchableOpacity key={`${tag}-${index}`} onPress={onPress} style={styles.tag}>
      <Text style={styles.textTag}>X {tag}</Text>
    </TouchableOpacity>
  )
}

const ExperienceForm = forwardRef((props, ref) => {
  const [country, setCountry] = useState('')
  const [organizations, setOrganizations] = useState([])
  const [dropdown, setDropDown] = useState(false)
  const [checked, setChecked] = useState(false)
  const [skillsList, setSkillsList] = useState([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

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
        // TODO: static org id
        // const orgId = '7f9df1bc-10b8-445c-0b4a-08d81d3203ed'
        // try {
        //   // const organisationId = await createOrganisation(orgId);
        //   const job = await createJob(values, orgId)
        //   await createCredential(job, values)
        // } catch (err) {
        //   console.error(err)
        // }
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isSubmitting, setFieldValue }) => (
        // TODO: added height as dropdown was not working
        <View style={{ width: '100%', height: 500 }}>
          <Spinner visible={isSubmitting} />

          <CustomInput
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
            value={values.title}
            label={'Title'}
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
            }}
            style={styles.formDropDown}
            searchable={true}
            searchablePlaceholder="Search organization"
            searchablePlaceholderTextColor="gray"
            placeholder={'Company name'}
            touched={touched.organisationName}
            error={errors.organisationName}
            fieldName={'Company Name'}
            showTitle={values.organisationName != '' ? true : false}
          />
          <CustomInput
            onChangeText={handleChange('countryAlpha2')}
            onBlur={handleBlur('countryAlpha2')}
            value={country}
            label={'Country or Region'}
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
              searchablePlaceholder="Search for country"
              searchablePlaceholderTextColor="gray"
              placeholder={'country'}
              touched={touched.countryAlpha2}
              error={errors.countryAlpha2}
              isVisible={dropdown}
            />
          ) : null}
          <Text
            style={[TextStyles.boldText, TextStyles.textTertiary3, { alignSelf: 'flex-end', paddingRight: 20 }]}
            onPress={() => setDropDown(true)}
          >
            Use current location
          </Text>
          <View style={styles.checkBoxView}>
            <CheckBox
              uncheckedIcon="circle-o"
              checkedIcon={<BlueTick />}
              checked={checked}
              onPress={() => {
                setFieldValue('privacyInd', !checked)
                setChecked(!checked)
              }}
              onBlur={handleChange('privacyInd')}
              containerStyle={{ paddingVertical: 0, paddingHorizontal: 0 }}
            />
            <Text style={[TextStyles.h4, TextStyles.textTertiary9, { fontFamily: fontStyles[FontFamily.semibold] }]}>
              I currently work here
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <DateTimePicker
              onChangeDate={(date: string) => {
                console.log(date)
                handleChange('startDate')
                setFieldValue('startDate', date)
              }}
              value={values.startDate}
              label={'Start date'}
              touched={touched.startDate}
              error={errors.startDate}
              viewStyle={{ width: '40%' }}
              showTitle={values.startDate !== '' ? true : false}
            />
            <DateTimePicker
              onChangeDate={(date: string) => {
                handleChange('endDate')
                setFieldValue('endDate', date)
              }}
              value={values.endDate}
              label={'End date'}
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
            label={'Description'}
            touched={touched.description}
            error={errors.description}
            showTitle={values.title !== '' ? true : false}
          />
          <DropDownTags
            items={skillsList}
            multiple={true}
            multipleText="Skills developed %d"
            min={0}
            max={10}
            searchable={true}
            searchablePlaceholder="Search skills"
            searchablePlaceholderTextColor="gray"
            placeholder={'Skills developed'}
            fieldName={'Skills developed'}
            showTitle={values.skillNames.length > 0 ? true : false}
            defaultValue={selectedSkills}
            onChangeItem={item => {
              setSelectedSkills(item)
            }}
            tags={selectedSkills}
            deleteItem={deleteSkill}
          />
          <View style={[styles.checkBoxView]}>
            <CheckBox
              uncheckedIcon="circle-o"
              checkedIcon={<BlueTick />}
              checked={checked}
              onPress={() => {
                setFieldValue('privacyInd', !checked)
                setChecked(!checked)
              }}
              onBlur={handleChange('privacyInd')}
              containerStyle={{ paddingVertical: 0, paddingHorizontal: 0 }}
            />
            <Text
              style={[
                TextStyles.h4,
                TextStyles.textTertiary9,
                { fontFamily: fontStyles[FontFamily.semibold], width: '90%' },
              ]}
            >
              Request verification of employment from company
            </Text>
          </View>
        </View>
      )}
    </Formik>
  )
})

export default ExperienceForm

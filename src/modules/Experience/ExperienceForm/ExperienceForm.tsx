import DateTimePicker from '@react-native-community/datetimepicker'
import api from 'api'
import { BlueTick } from 'assets/Images'
import { DropDown, Spinner } from 'components'
import CustomInput from 'components/CustomInput/CustomInput'
import TagInput from 'components/TagInput/TagInput'
import countries from 'constants/countries'
import { Formik } from 'formik'
import { USER_ID } from 'helpers/helpers'
import React, { useState } from 'react'
import { Platform, Text, TouchableOpacity, View } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { FontFamily, TextStyles } from 'styles'
import fontStyles from 'styles/font.styles'

import styles from './ExperienceForm.styles'
import ValidationSchema from './ValidationSchema'

const INITIAL_VALUES = {
  // details
  title: '',
  description: '',
  id: '',
  startDate: undefined,
  endDate: undefined,
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

const rendertag = ({ tag, index, onPress }) => {
  return (
    <TouchableOpacity key={`${tag}-${index}`} onPress={onPress} style={styles.tag}>
      <Text style={styles.textTag}>X {tag}</Text>
    </TouchableOpacity>
  )
}

const ExperienceForm = () => {
  const [country, setCountry] = useState('')
  const [dropdown, setDropDown] = useState(false)
  const [checked, setChecked] = useState(false)
  const [tags, setTags] = useState([])
  const [date, setDate] = useState(new Date(1598051730000))
  const [show, setShow] = useState(false)

  const onChange = (event: Event, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    setDate(currentDate)
  }

  const showMode = (currentMode: any) => {
    setShow(true)
  }

  const showDatepicker = () => {
    showMode('date')
  }

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      enableReinitialize={true}
      validationSchema={ValidationSchema}
      onSubmit={async (values, actions) => {
        console.log('experience: ', values)
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isSubmitting, setFieldValue }) => (
        <View style={{ width: '100%' }}>
          <Spinner visible={isSubmitting} />
          {show ? <DateTimePicker testID="dateTimePicker" value={date} display="default" onChange={onChange} /> : null}

          <CustomInput
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
            value={values.title}
            label={'Title'}
            touched={touched.title}
            error={errors.title}
            showTitle={false}
          />
          <CustomInput
            onChangeText={handleChange('organisationName')}
            onBlur={handleBlur('organisationName')}
            value={values.organisationName}
            label={'Company name'}
            touched={touched.organisationName}
            error={errors.organisationName}
            showTitle={false}
          />
          <CustomInput
            onChangeText={handleChange('countryAlpha2')}
            onBlur={handleBlur('countryAlpha2')}
            value={country}
            label={'Country or Region'}
            touched={touched.countryAlpha2}
            error={errors.countryAlpha2}
            showTitle={false}
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
            <CustomInput
              onChangeText={handleChange('startDate')}
              onBlur={handleBlur('startDate')}
              value={values.startDate}
              label={'Start date'}
              keyboardType="email-address"
              autoCapitalize="none"
              touched={touched.startDate}
              error={errors.startDate}
              viewStyle={{ width: '40%' }}
              showTitle={false}
              onFocus={showDatepicker}
            />
            <CustomInput
              onChangeText={handleChange('endDate')}
              onBlur={handleBlur('endDate')}
              value={values.endDate}
              label={'End date'}
              autoCapitalize="none"
              touched={touched.endDate}
              error={errors.endDate}
              viewStyle={{ width: '40%' }}
              showTitle={false}
              onFocus={showDatepicker}
            />
          </View>
          <CustomInput
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            value={values.description}
            label={'Description'}
            touched={touched.description}
            error={errors.description}
            showTitle={false}
          />
          <TagInput
            initialTags={tags}
            initialText=""
            onChangeTags={(tag: any) => setTags(tag)}
            onTagPress={(index: any, tagLabel: any, event: any, deleted: any) => {
              console.log(index, tagLabel, event, deleted ? 'deleted' : 'not deleted')
            }}
            renderTag={(tag: any) => rendertag(tag)}
          />
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
}

export default ExperienceForm

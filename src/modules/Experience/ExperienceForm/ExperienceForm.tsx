import api from 'api'
import { DropDown, Spinner } from 'components'
import CustomInput from 'components/CustomInput/CustomInput'
import countries from 'constants/countries'
import { Formik } from 'formik'
import { USER_ID } from 'helpers/helpers'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import Icon from 'react-native-vector-icons'
import { TextStyles } from 'styles'
import { showSimpleMessage } from 'utils/error'

import ValidationSchema from './ValidationSchema'

const INITIAL_VALUES = {
  // details
  title: '',
  description: '',
  id: '',
  startDate: null,
  endDate: null,
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

const ExperienceForm = () => {
  const { t } = useTranslation()
  const [country, setCountry] = useState('')
  const [dropdown, setDropDown] = useState(false)
  const [selectedCountriesValues, setSelectedCountriesValues] = useState(['uk'])
  const [selectedCountries, setSelectedCountries] = useState([{ label: 'UK', value: 'uk' }])
  return (
    <Formik
      initialValues={INITIAL_VALUES}
      enableReinitialize={true}
      validationSchema={ValidationSchema}
      onSubmit={async (values, actions) => {
        console.log('experience: ', values)
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isSubmitting, setFieldValue }) => {
        return (
          <View style={{ width: '100%' }}>
            <Spinner visible={isSubmitting} />
            <CustomInput
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
              label={t('Title')}
              touched={touched.title}
              error={errors.title}
              showTitle={false}
            />
            <CustomInput
              onChangeText={handleChange('organisationName')}
              onBlur={handleBlur('organisationName')}
              value={values.organisationName}
              label={t('Company name')}
              touched={touched.organisationName}
              error={errors.organisationName}
              showTitle={false}
            />
            <CustomInput
              onChangeText={handleChange('countryAlpha2')}
              onBlur={handleBlur('countryAlpha2')}
              value={country}
              label={t('Country or Region')}
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
                placeholder={t('country')}
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
            <CustomInput
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
              label={t('Description')}
              touched={touched.description}
              error={errors.description}
              showTitle={false}
            />
          </View>
        )
      }}
    </Formik>
  )
}

export default ExperienceForm

import api from 'api'
import { BlueTick } from 'assets/Images'
import { ButtonContainer, DropDown, Spinner, } from 'components'
import CustomInput from 'components/CustomInput/CustomInput'
import countries from 'constants/countries'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'
import { FontFamily, TextStyles } from 'styles'
import fontStyles from 'styles/font.styles'
import { showSimpleMessage } from 'utils/error'
import { nameHasDigitsOrSymbols } from 'utils/regex'
import * as yup from 'yup'

const ProfileForm = () => {
  const { t } = useTranslation()
  const [country, setCountry] = useState('')
  const [dropdown, setDropDown] = useState(false)
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        countryAlpha2: '',
        email: '',
        phoneNumber: ''
      }}
      validationSchema={yup.object().shape({
        firstName: yup
          .string()
          .min(2)
          .max(50)
          .required(t('required'))
          .test('First name', 'First name cannot include numbers or symbols', (value: any) => {
            return !nameHasDigitsOrSymbols(value)
          })
          .label('First name'),
        lastName: yup
          .string()
          .min(2)
          .max(50)
          .required(t('required'))
          .test('Last name', 'Last name cannot include numbers or symbols', (value: any) => {
            return !nameHasDigitsOrSymbols(value)
          })
          .label('Last name'),
        countryAlpha2: yup.string().required('Required').label('Country'),
        email: yup
          .string()
          .min(2, t('emailError'))
          .max(255)
          .email(t('validEmailError'))
          .required(t('required'))
          .label('Email'),
        phoneNumber: yup
          .string()
          .required(t('required'))
          .matches(phoneRegExp, 'Phone number is not valid')
          .min(10, "too short")
          .max(13, "too long"),
      })}
      onSubmit={async (values, actions) => {
        console.log('Register values: ', values)
        actions.setSubmitting(true)
        await api.auth
          .register({ ...values })
          .then(response => {
            console.log('response', response)
            actions.setSubmitting(false)
            showSimpleMessage('success', 'Registration Successful')
          })
          .catch(error => {
            actions.setSubmitting(false)
            console.log('Error =>', error)
            showSimpleMessage('danger', 'Error', error)
          })
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isSubmitting, setFieldValue }) => (
        <View style={{ width: '100%' }}>
          <Spinner visible={isSubmitting} />
          <CustomInput
            onChangeText={handleChange('firstName')}
            onBlur={handleBlur('firstName')}
            value={values.firstName}
            label={t('firstName')}
            touched={touched.firstName}
            error={errors.firstName}
          />
          <CustomInput
            onChangeText={handleChange('lastName')}
            onBlur={handleBlur('lastName')}
            value={values.lastName}
            label={t('Surname')}
            touched={touched.lastName}
            error={errors.lastName}
          />
          <CustomInput
            onChangeText={handleChange('countryAlpha2')}
            onBlur={handleBlur('countryAlpha2')}
            value={values.countryAlpha2}
            label={t('Country/Region')}
            touched={touched.countryAlpha2}
            error={errors.countryAlpha2}
          />
          {
            dropdown ?
              <DropDown
                items={countries.map(c => ({
                  label: c.name,
                  value: c.code,
                }))}
                onChangeItem={itemValue => {
                  handleChange('countryAlpha2')
                  handleBlur('countryAlpha2')
                  setFieldValue('countryAlpha2', itemValue.label)
                  setCountry(itemValue.value)
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
              /> : null
          }
          <Text style={[
            TextStyles.boldText,
            TextStyles.textTertiary3,
            { alignSelf: 'flex-end', paddingRight: 20 }
          ]}
            onPress={() => setDropDown(true)}
          >Use current location</Text>
          <CustomInput
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            label={t('email')}
            keyboardType="email-address"
            autoCapitalize="none"
            touched={touched.email}
            error={errors.email}
          />
          <CustomInput
            onChangeText={handleChange('phoneNumber')}
            onBlur={handleBlur('phoneNumber')}
            value={values.phoneNumber}
            label={t('Cellphone')}
            keyboardType="phone-pad"
            autoCapitalize="none"
            touched={touched.phoneNumber}
            error={errors.phoneNumber}
          />
        </View>
      )}
    </Formik>
  )
}

export default ProfileForm

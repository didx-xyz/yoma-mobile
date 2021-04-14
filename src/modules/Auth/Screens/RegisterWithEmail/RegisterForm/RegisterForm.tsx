import api from 'api'
import { BlueTick } from 'assets/images'
import { ButtonContainer, DropDown, Input, Spinner } from 'components'
import countries from 'constants/countries'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { TextStyles } from 'styles'
import ButtonStyles from 'styles/button.styles'
import { showSimpleMessage } from 'utils/error'
import { nameHasDigitsOrSymbols } from 'utils/regex'
import * as yup from 'yup'

import Text, { HeaderLevels, Span } from '../../../../../components/Typography'

const RegisterForm = () => {
  const { t } = useTranslation()
  const [checked, setChecked] = useState(false)
  const [country, setCountry] = useState('')

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        countryAlpha2: '',
        privacyInd: false,
        password: '',
        confirmPassword: '',
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
        email: yup
          .string()
          .min(2, t('emailError'))
          .max(255)
          .email(t('validEmailError'))
          .required(t('required'))
          .label('Email'),
        countryAlpha2: yup.string().required('Required').label('Country'),
        privacyInd: yup
          .bool()
          .test('accepted', 'Please accept the privacy policy before proceeding', value => value !== false),
        password: yup
          .string()
          .min(8, t('passwordMinCharError'))
          .required(t('required'))
          .label('Password')
          .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, t('passwordRegexError')),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref('password'), null], 'Passwords must match')
          .min(8, t('passwordMinCharError'))
          .required(t('required'))
          .label('Confirm password')
          .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, t('passwordRegexError')),
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
        <View>
          <Spinner visible={isSubmitting} />
          <Input
            onChangeText={handleChange('firstName')}
            onBlur={handleBlur('firstName')}
            value={values.firstName}
            label={t('firstName')}
            touched={touched.firstName}
            error={errors.firstName}
          />
          <Input
            onChangeText={handleChange('lastName')}
            onBlur={handleBlur('lastName')}
            value={values.lastName}
            label={t('lastName')}
            touched={touched.lastName}
            error={errors.lastName}
          />
          <Input
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            label={t('email')}
            keyboardType="email-address"
            autoCapitalize="none"
            touched={touched.email}
            error={errors.email}
          />
          <DropDown
            items={countries.map(c => ({
              label: c.name,
              value: c.code,
            }))}
            onChangeItem={itemValue => {
              handleChange('countryAlpha2')
              handleBlur('countryAlpha2')
              setFieldValue('countryAlpha2', itemValue.value)
              setCountry(itemValue.value)
            }}
            defaultValue={country}
            searchable={true}
            searchablePlaceholder="Search for country"
            searchablePlaceholderTextColor="gray"
            placeholder={t('country')}
            touched={touched.countryAlpha2}
            error={errors.countryAlpha2}
          />
          <Input
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            label={t('createPassword')}
            autoCapitalize="none"
            touched={touched.password}
            error={errors.password}
            secureTextEntry
          />
          <Input
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            value={values.confirmPassword}
            label={t('confirmPassword')}
            autoCapitalize="none"
            touched={touched.confirmPassword}
            error={errors.confirmPassword}
            secureTextEntry
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '90%' }}>
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
            <Text.Header level={HeaderLevels.h5}>
              {t('iAgree')} &nbsp;
              <Span style={{ textDecorationLine: 'underline' }}>{t('privacyPolicy')}</Span>
            </Text.Header>
          </View>
          <ButtonContainer
            disabled={isSubmitting}
            buttonText={t<string>('getStarted')}
            buttonStyle={[ButtonStyles.largeTertiary3Button, { marginVertical: 15, alignSelf: 'center' }]}
            buttonTextStyle={[TextStyles.textWhite, TextStyles.buttonText]}
            onPress={handleSubmit}
          />
        </View>
      )}
    </Formik>
  )
}

export default RegisterForm

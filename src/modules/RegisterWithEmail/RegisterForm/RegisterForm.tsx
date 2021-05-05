import api from 'api'
import { ButtonContainer, CheckBox, DropDown, Input, Spinner } from 'components'
import countries from 'constants/countries'
import { Formik, FormikProps, FormikValues } from 'formik'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { colors, Colors } from 'styles'
import ButtonStyles from 'styles/button.styles'
import { showSimpleMessage } from 'utils/error'
import { nameHasDigitsOrSymbols } from 'utils/regex'
import * as yup from 'yup'

import { Span } from '../../../components/Typography'
import styles from './RegisterForm.styles'

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
          .then(() => {
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
      {(formikHandlers: FormikProps<FormikValues>) => (
        <View style={styles.form}>
          <Spinner visible={formikHandlers.isSubmitting} />
          <Input name={'firstName'} label={t('firstName')} handlers={formikHandlers} />
          <Input name={'lastName'} label={t('lastName')} handlers={formikHandlers} />
          <Input
            name={'email'}
            label={t('email')}
            handlers={formikHandlers}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <DropDown
            items={countries.map(c => ({
              label: c.name,
              value: c.code,
            }))}
            onChangeItem={itemValue => {
              formikHandlers.handleChange('countryAlpha2')
              formikHandlers.handleBlur('countryAlpha2')
              formikHandlers.setFieldValue('countryAlpha2', itemValue.value)
              setCountry(itemValue.value)
            }}
            defaultValue={country}
            searchable={true}
            searchablePlaceholder="Search for country"
            searchablePlaceholderTextColor={colors[Colors.menuGrey]}
            placeholder={t('country')}
            isTouched={formikHandlers.touched.countryAlpha2}
            error={formikHandlers.errors.countryAlpha2}
            showTitle={formikHandlers.values.countryAlpha2 !== ''}
            fieldName={'Country'}
          />
          <Input
            name={'password'}
            label={t('createPassword')}
            handlers={formikHandlers}
            autoCapitalize="none"
            secureTextEntry
          />
          <Input
            name={'confirmPassword'}
            label={t('confirmPassword')}
            handlers={formikHandlers}
            autoCapitalize="none"
            secureTextEntry
          />
          <CheckBox
            isChecked={checked}
            label={
              <>
                {t('I agree')}&nbsp;
                <Span color={Colors.menuGrey} style={styles.privacy} onPress={() => {}}>
                  {t('Yoma’s Privacy Policy')}
                </Span>
              </>
            }
            onPress={() => {
              formikHandlers.setFieldValue('privacyInd', !checked)
              setChecked(!checked)
            }}
          />
          <ButtonContainer
            disabled={formikHandlers.isSubmitting}
            buttonText={t<string>('getStarted')}
            buttonStyle={[ButtonStyles.largeTertiary3Button, styles.button]}
            onPress={formikHandlers.handleSubmit}
          />
        </View>
      )}
    </Formik>
  )
}

export default RegisterForm

import countries from 'constants/countries'
import { Formik, FormikProps, FormikValues } from 'formik'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

import Button from '../../../components/Button'
import CheckBox from '../../../components/CheckBox'
import DropDown from '../../../components/DropDown'
import Input from '../../../components/Input'
import OnboardingForms from '../../../components/OnboardingForms'
import Spinner from '../../../components/Spinner'
import { Span } from '../../../components/Typography'
import { Colors } from '../../../styles'
import * as RegexUtils from '../../../utils/regex'
import * as StringUtils from '../../../utils/strings.utils'
import { AuthRegistration } from '../../Auth/Auth.types'
import styles from './RegisterForm.styles'

interface Props {
  onRegisterUser: (details: AuthRegistration) => void
}

const RegisterForm = ({ onRegisterUser }: Props) => {
  const { t } = useTranslation()
  const [hasChecked, setHasChecked] = useState(false)

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
          .test('First name', 'First name cannot include numbers or symbols', value => {
            return !RegexUtils.nameHasDigitsOrSymbols(value!)
          })
          .label('First name'),
        lastName: yup
          .string()
          .min(2)
          .max(50)
          .required(t('required'))
          .test('Last name', 'Last name cannot include numbers or symbols', value => {
            return !RegexUtils.nameHasDigitsOrSymbols(value!)
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
      onSubmit={async values => onRegisterUser(values)}
    >
      {(formikHandlers: FormikProps<FormikValues>) => (
        <>
          <OnboardingForms>
            <Spinner visible={formikHandlers.isSubmitting} />
            <Input name={'firstName'} label={t('firstName')} />
            <Input name={'lastName'} label={t('lastName')} />
            <Input name={'email'} label={t('email')} keyboardType="email-address" autoCapitalize="none" />
            <DropDown
              items={StringUtils.mapToDropDownArray(countries, 'code', 'name')}
              name={'countryAlpha2'}
              label={'Country'}
              searchPlaceholder={t('Search country')}
            />
            <Input name={'password'} label={t('createPassword')} autoCapitalize="none" secureTextEntry />
            <Input name={'confirmPassword'} label={t('confirmPassword')} autoCapitalize="none" secureTextEntry />
            <CheckBox
              isChecked={hasChecked}
              label={
                <>
                  {t('I agree')}&nbsp;
                  <Span color={Colors.MenuGrey} style={styles.privacy} onPress={() => {}}>
                    {t('Yoma’s Privacy Policy')}
                  </Span>
                </>
              }
              onPress={() => {
                formikHandlers.setFieldValue('privacyInd', !hasChecked)
                setHasChecked(!hasChecked)
              }}
            />
          </OnboardingForms>
          <Button label={t('getStarted')} onPress={formikHandlers.handleSubmit} style={styles.button} />
        </>
      )}
    </Formik>
  )
}

export default RegisterForm

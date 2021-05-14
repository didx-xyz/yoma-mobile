import { Input, OnboardingForms } from 'components'
import Button from 'components/Button'
import { Formik, FormikProps, FormikValues } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import * as yup from 'yup'

import { AuthCredentials } from '../../Auth/Auth.types'
import { INITIAL_VALUES } from './LoginForm.constants'
import styles from './LoginForm.styles'

interface Props {
  onLoginUser: (details: AuthCredentials) => void
}

const LoginForm = ({ onLoginUser }: Props) => {
  const { t } = useTranslation()
  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={yup.object().shape({
        email: yup
          .string()
          .min(2, t('emailError'))
          .max(255)
          .email(t('validEmailError'))
          .required(t('required'))
          .label('Email'),
        password: yup.string().min(8, t('passwordMinCharError')).required(t('required')).label('Password'),
      })}
      onSubmit={async values => {
        onLoginUser(values)
      }}
    >
      {(formikHandlers: FormikProps<FormikValues>) => (
        <>
          <OnboardingForms>
            <Input
              name={'email'}
              label={t('email')}
              handlers={formikHandlers}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input name={'password'} label={t('password')} handlers={formikHandlers} secureTextEntry />
          </OnboardingForms>
          <View style={styles.buttonContainer}>
            <Button label={t('login')} onPress={formikHandlers.handleSubmit} />
          </View>
        </>
      )}
    </Formik>
  )
}

export default LoginForm

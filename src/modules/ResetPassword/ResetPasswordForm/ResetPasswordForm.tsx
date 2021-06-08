import { StackNavigationProp } from '@react-navigation/stack'
import api from 'api'
import { Input, OnboardingForms } from 'components'
import Button from 'components/Button'
import { Formik, FormikProps, FormikValues } from 'formik'
import { AuthNavigationRoutes } from 'modules/AppNavigation/Authentication/Authentication.routes'
import { AuthNavigatorParamsList } from 'modules/AppNavigation/Authentication/Authentication.types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { showSimpleMessage } from 'utils/error'
import * as yup from 'yup'

import styles from './ResetPasswordForm.styles'

interface Props {
  id: string
  token: string
  navigation: StackNavigationProp<AuthNavigatorParamsList, AuthNavigationRoutes.ResetPassword>
}

const ResetPasswordForm = ({ id, token, navigation }: Props) => {
  const { t } = useTranslation()
  return (
    <Formik
      initialValues={{
        password: '',
        confirmPassword: '',
      }}
      validationSchema={yup.object().shape({
        password: yup
          .string()
          .min(8)
          .required(t('required'))
          .label('Password')
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
          ),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref('password'), null], 'Passwords must match')
          .min(8)
          .required(t('required'))
          .label('Confirm password'),
      })}
      onSubmit={async values => {
        console.log('Login values: ', values)
        await api.users.password
          .edit(id, { ...values, token })
          .then(() => {
            showSimpleMessage('success', 'Password reset successful')
            navigation.navigate(AuthNavigationRoutes.Login)
          })
          .catch(error => {
            console.log('Error =>', error)
            showSimpleMessage('danger', 'Error', error)
          })
      }}
    >
      {(formikHandlers: FormikProps<FormikValues>) => (
        <>
          <OnboardingForms>
            <Input
              name={'password'}
              label={t('password')}
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
          </OnboardingForms>
          <Button
            isDisabled={formikHandlers.isSubmitting}
            label={t('resetPassword')}
            onPress={formikHandlers.handleSubmit}
            style={styles.button}
          />
        </>
      )}
    </Formik>
  )
}

export default ResetPasswordForm

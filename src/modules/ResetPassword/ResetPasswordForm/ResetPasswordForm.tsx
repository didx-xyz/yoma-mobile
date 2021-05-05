import api from 'api'
import { Input, ButtonContainer } from 'components'
import { Formik, FormikProps, FormikValues } from 'formik'
import { NavigationRoutes } from 'modules/AppNavigation/Authentication/Authentication.routes'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import ButtonStyles from 'styles/button.styles'
import { showSimpleMessage } from 'utils/error'
import * as yup from 'yup'

import styles from './ResetPasswordForm.styles'

interface ResetPasswordFormProps {
  id: string
  token: string
  navigation: any
}

const ResetPasswordForm = ({ id, token, navigation }: ResetPasswordFormProps) => {
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
          .then(response => {
            showSimpleMessage('success', 'Password Reset Successful')
            navigation.navigate(NavigationRoutes.Login)
          })
          .catch(error => {
            console.log('Error =>', error)
            showSimpleMessage('danger', 'Error', error)
          })
      }}
    >
      {(formikHandlers: FormikProps<FormikValues>) => (
        <View style={styles.form}>
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
          <ButtonContainer
            disabled={formikHandlers.isSubmitting}
            buttonText={t<string>('resetPassword')}
            buttonStyle={[ButtonStyles.largeTertiary3Button, styles.button]}
            onPress={formikHandlers.handleSubmit}
          />
        </View>
      )}
    </Formik>
  )
}

export default ResetPasswordForm

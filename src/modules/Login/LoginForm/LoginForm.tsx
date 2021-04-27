import { Input, ButtonContainer } from 'components'
import { Formik } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { TextStyles } from 'styles'
import ButtonStyles from 'styles/button.styles'
import * as yup from 'yup'

import { AuthCredentials } from '../../Auth/Auth.types'

interface Props {
  onLoginUser: (details: AuthCredentials) => void
}

const LoginForm = ({ onLoginUser }: Props) => {
  const { t } = useTranslation()
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
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
      onSubmit={async (values, actions) => {
        onLoginUser(values)
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isSubmitting }) => (
        <View>
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
          <Input
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            label={t('password')}
            touched={touched.password}
            error={errors.password}
            secureTextEntry
          />
          <ButtonContainer
            disabled={isSubmitting}
            buttonText={t<string>('login')}
            buttonStyle={[ButtonStyles.largeTertiary3Button, { marginVertical: 15, alignSelf: 'center' }]}
            buttonTextStyle={[TextStyles.textWhite, TextStyles.buttonText]}
            onPress={handleSubmit}
          />
        </View>
      )}
    </Formik>
  )
}

export default LoginForm

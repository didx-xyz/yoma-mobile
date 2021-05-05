import api from 'api'
import { Input, ButtonContainer } from 'components'
import { Formik, FormikProps, FormikValues } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import ButtonStyles from 'styles/button.styles'
import { showSimpleMessage } from 'utils/error'
import * as yup from 'yup'

import styles from './ForgotPasswordForm.styles'

interface Props {
  setSubmitted: Function
}

const ForgotPasswordForm = ({ setSubmitted }: Props) => {
  const { t } = useTranslation()
  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={yup.object().shape({
        email: yup.string().min(2).max(255).email().required(t('required')).label('Email'),
      })}
      onSubmit={async values => {
        await api.auth
          .resetPassword({ ...values })
          .then((response: any) => {
            showSimpleMessage('success', response.meta.message)
            setSubmitted(true)
          })
          .catch(error => {
            showSimpleMessage('danger', 'Error', error)
          })
      }}
    >
      {(formikHandlers: FormikProps<FormikValues>) => (
        <View style={styles.form}>
          <Input
            name={'email'}
            label={t('email')}
            keyboardType="email-address"
            autoCapitalize="none"
            handlers={formikHandlers}
          />
          <ButtonContainer
            disabled={formikHandlers.isSubmitting}
            buttonText={t<string>('sendInstruction')}
            buttonStyle={[ButtonStyles.largeTertiary3Button, styles.button]}
            onPress={formikHandlers.handleSubmit}
          />
        </View>
      )}
    </Formik>
  )
}

export default ForgotPasswordForm

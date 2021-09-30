import api from 'api'
import { Formik, FormikProps, FormikValues } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { showSimpleMessage } from 'utils/error'
import * as yup from 'yup'

import { Input, OnboardingForms } from '~/components'
import Button from '~/components/Button'

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
        <>
          <OnboardingForms>
            <Input
              name={'email'}
              label={t('email')}
              keyboardType="email-address"
              autoCapitalize="none"
              handlers={formikHandlers}
            />
          </OnboardingForms>
          <Button label={t('sendInstruction')} onPress={formikHandlers.handleSubmit} style={styles.button} />
        </>
      )}
    </Formik>
  )
}

export default ForgotPasswordForm

import { Formik, FormikProps, FormikValues } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

import { apiConfig } from '~/api'
import { OnboardingForms } from '~/components'
import Button from '~/components/Button'
import { showSimpleMessage } from '~/utils/error'

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
        await apiConfig.auth
          .resetPassword({ ...values })
          .then((response: any) => {
            showSimpleMessage('success', response.meta.message)
            setSubmitted(true)
          })
          .catch((error: string) => {
            showSimpleMessage('danger', 'Error', error)
          })
      }}
    >
      {(formikHandlers: FormikProps<FormikValues>) => (
        <>
          <OnboardingForms>
            <Input name={'email'} label={t('email')} keyboardType="email-address" autoCapitalize="none" />
          </OnboardingForms>
          <Button label={t('sendInstruction')} onPress={formikHandlers.handleSubmit} style={styles.button} />
        </>
      )}
    </Formik>
  )
}

export default ForgotPasswordForm

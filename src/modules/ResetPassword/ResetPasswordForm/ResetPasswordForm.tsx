import { Formik, FormikProps, FormikValues } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

import { Input, OnboardingForms } from '~/components'
import Button from '~/components/Button'

import styles from './ResetPasswordForm.styles'

const ResetPasswordForm = () => {
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
      onSubmit={() => {}}
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

import Button from 'components/Button'
import Input from 'components/Input'
import OnboardingForms from 'components/OnboardingForms'
import { FormikProps } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import styles from './LoginForm.styles'

interface Props {
  form: FormikProps<any>
}

const LoginForm = ({ form }: Props) => {
  const { t } = useTranslation()

  return (
    <>
      <OnboardingForms>
        <Input name={'email'} label={t('email')} keyboardType="email-address" autoCapitalize="none" />
        <Input name={'password'} label={t('password')} secureTextEntry />
      </OnboardingForms>
      <View style={styles.buttonContainer}>
        <Button label={t('login')} onPress={form.handleSubmit} />
      </View>
    </>
  )
}

export default LoginForm

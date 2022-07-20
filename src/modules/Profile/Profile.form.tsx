import React from 'react'
import { useTranslation } from 'react-i18next'

import FormLayout from '~/components/FormLayout'
import Input from '~/components/Input'
import CountrySelectField from '~/modules/CountrySelectField'

const ProfileForm = () => {
  const { t } = useTranslation()

  return (
    <FormLayout>
      <Input name={'firstName'} label={t('firstName')} />
      <Input name={'lastName'} label={t('Surname')} />
      <CountrySelectField
        name="countryAlpha2"
        label={t('Country')}
        searchPlaceholder="Filter countries"
        modalHeader="Select your country"
      />
      <Input name={'email'} label={t('Email')} keyboardType="email-address" autoCapitalize="none" />
      <Input name={'phoneNumber'} label={t('Cellphone')} keyboardType="phone-pad" autoCapitalize="none" />
    </FormLayout>
  )
}

export default ProfileForm

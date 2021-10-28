import React from 'react'
import { useTranslation } from 'react-i18next'

import CountryPickerField from '../../components/CountryPickerField'
import Input from '../../components/Input'

const ProfileForm = () => {
  const { t } = useTranslation()

  return (
    <>
      <Input name={'firstName'} label={t('firstName')} />
      <Input name={'lastName'} label={t('Surname')} />
      <CountryPickerField name="countryAlpha2" label={t('Country')} />
      <Input name={'email'} label={t('email')} keyboardType="email-address" autoCapitalize="none" />
      <Input name={'phoneNumber'} label={t('Cellphone')} keyboardType="phone-pad" autoCapitalize="none" />
    </>
  )
}

export default ProfileForm

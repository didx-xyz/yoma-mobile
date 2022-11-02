import React from 'react'
import { useTranslation } from 'react-i18next'

import FormLayout from '~/components/FormLayout'
import Input from '~/components/Input'
import CountrySelectField from '~/modules/CountrySelectField'

import { Fields } from './Profile.types'

const ProfileForm = () => {
  const { t } = useTranslation()

  return (
    <FormLayout>
      <Input name={Fields.Firstname} label={t('firstName')} />
      <Input name={Fields.Lastname} label={t('Surname')} />
      <CountrySelectField
        name={Fields.Country}
        label={t('Country')}
        searchPlaceholder={t('Filter countries')}
        modalHeader={t('Select your country')}
      />
      <Input name={Fields.Email} label={t('Email')} keyboardType="email-address" autoCapitalize="none" />
      <Input name={Fields.PhoneNumber} label={t('Cellphone')} keyboardType="phone-pad" autoCapitalize="none" />
    </FormLayout>
  )
}

export default ProfileForm

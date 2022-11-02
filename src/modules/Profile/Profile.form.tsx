import React from 'react'
import { useTranslation } from 'react-i18next'

import FormLayout from '~/components/FormLayout'
import Input from '~/components/Input'
import CountrySelectField from '~/modules/CountrySelectField'
import { types as UserTypes } from '~/modules/User'

const ProfileForm = () => {
  const { t } = useTranslation()

  return (
    <FormLayout>
      <Input name={UserTypes.UserFields.Firstname} label={t('firstName')} />
      <Input name={UserTypes.UserFields.Lastname} label={t('Surname')} />
      <CountrySelectField
        name={UserTypes.UserFields.Country}
        label={t('Country')}
        searchPlaceholder={t('Filter countries')}
        modalHeader={t('Select your country')}
      />
      <Input name={UserTypes.UserFields.Email} label={t('Email')} keyboardType="email-address" autoCapitalize="none" />
      <Input
        name={UserTypes.UserFields.PhoneNumber}
        label={t('Cellphone')}
        keyboardType="phone-pad"
        autoCapitalize="none"
      />
    </FormLayout>
  )
}

export default ProfileForm

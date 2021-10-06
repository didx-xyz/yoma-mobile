import countries from 'constants/countries'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { mapToDropDownArray } from 'utils/strings.utils'

import DropDown from '../../components/DropDown'
import Input from '../../components/Input'

const ProfileForm = () => {
  const { t } = useTranslation()

  return (
    <>
      <Input name={'firstName'} label={t('firstName')} />
      <Input name={'lastName'} label={t('Surname')} />
      <DropDown
        items={mapToDropDownArray(countries, 'code', 'name')}
        name={'countryAlpha2'}
        label={'Country'}
        searchPlaceholder={t('Search country')}
      />
      <Input name={'email'} label={t('email')} keyboardType="email-address" autoCapitalize="none" />
      <Input name={'phoneNumber'} label={t('Cellphone')} keyboardType="phone-pad" autoCapitalize="none" />
    </>
  )
}

export default ProfileForm

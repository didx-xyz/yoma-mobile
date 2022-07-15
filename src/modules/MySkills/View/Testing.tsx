import React from 'react'
import { useTranslation } from 'react-i18next'

import CountrySelect from '~/modules/CountrySelectField'

const Testing = () => {
  const { t } = useTranslation()
  return <CountrySelect searchPlaceholder={t('Select the country')} />
}
export default Testing

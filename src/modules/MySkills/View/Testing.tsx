import React from 'react'
import { useTranslation } from 'react-i18next'

import CountrySelector from '~/components/CountrySelector'

const Testing = () => {
  const { t } = useTranslation()
  return <CountrySelector searchPlaceholder={t('Select the country')} />
}
export default Testing

import React from 'react'
import { useTranslation } from 'react-i18next'

import { CircleSmallYellowGreenSplatter } from '~/assets/images'
import ComingSoon from '~/components/ComingSoon'
import { Colors } from '~/styles'

const Marketplace = () => {
  const { t } = useTranslation()
  return (
    <ComingSoon
      subject={t('Marketplace')}
      byLine={t('Record your growth on Yoma, unlock skills through opportunities and earn rewards!')}
      heroBgColor={Colors.PrimaryGreen}
      BottomImg={CircleSmallYellowGreenSplatter}
      isPluralSubject={false}
    />
  )
}

export default Marketplace

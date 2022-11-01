import React from 'react'
import { useTranslation } from 'react-i18next'

import { BANNER_BG_GIRL_ON_BLUE } from '~/assets/images'
import { Colors } from '~/styles'

import BannerCard from './index'

const StayTunedBannerCard = () => {
  const { t } = useTranslation()
  return (
    <BannerCard
      content={{
        title: t('Stay tuned.'),
        titleColor: Colors.PrimaryYellow,
        body: t('More exciting opportunities coming soon!'),
        bodyColor: Colors.White,
        offset: { x: 125, y: 50 },
      }}
      background={{
        imageSrc: BANNER_BG_GIRL_ON_BLUE,
        imageOffset: { x: -40, y: 0 },
      }}
      height={190}
    />
  )
}

export default StayTunedBannerCard

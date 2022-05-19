import React from 'react'
import { useTranslation } from 'react-i18next'

import { CircleSmallYellowBlueSplatter } from '~/assets/images'
import ComingSoon from '~/components/ComingSoon'
import { Colors } from '~/styles'

const Challenges = () => {
  const { t } = useTranslation()
  return (
    <ComingSoon
      subject={t('Challenges')}
      byLine={t('Make a difference, earn rewards and build your CV by taking part in our impact challenges.')}
      heroBgColor={Colors.PrimaryBlue}
      BottomImg={CircleSmallYellowBlueSplatter}
    />
  )
}

export default Challenges

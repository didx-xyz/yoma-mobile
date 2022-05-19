import React from 'react'
import { useTranslation } from 'react-i18next'

import { CircleSmallGreenYellowSplatter } from '~/assets/images'
import ComingSoon from '~/components/ComingSoon'
import { Colors } from '~/styles'

const Courses = () => {
  const { t } = useTranslation()
  return (
    <ComingSoon
      pageName={t('Courses')}
      description={t('Upskill and show your skills on Yoma in order to reach your goals.')}
      heroBgColor={Colors.PrimaryYellow}
      BottomImg={CircleSmallGreenYellowSplatter}
    />
  )
}

export default Courses

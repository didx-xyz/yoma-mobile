import React from 'react'

import * as Types from '../../types/general.types'
import CvWidgetSkill from './CvViewSkill'

export interface NormalisedCvWidgetSkillItems {
  ids: string[]
  entities: Types.StdObj<React.ComponentProps<typeof CvWidgetSkill>>
}

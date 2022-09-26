import React from 'react'

import * as Types from '~/types/general.types'

import CvViewSkill from './CvViewSkill'

export interface NormalisedCvWidgetSkillItems {
  ids: string[]
  entities: Types.StdObj<React.ComponentProps<typeof CvViewSkill>>
}

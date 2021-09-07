import React from 'react'

import * as Types from '../../types/general.types'
import { CvWidgetCredential } from './index'

export interface NormalisedCvWidgetCredentialItems {
  ids: string[]
  entities: Types.StdObj<React.ComponentProps<typeof CvWidgetCredential>>
}

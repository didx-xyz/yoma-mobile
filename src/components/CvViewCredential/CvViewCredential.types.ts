import React from 'react'

import * as Types from '../../types/general.types'
import CvViewCredential from './index'

export interface CvViewCredentialsData {
  ids: string[]
  entities: Types.StdObj<Omit<React.ComponentProps<typeof CvViewCredential>, 'onEdit'>>
}

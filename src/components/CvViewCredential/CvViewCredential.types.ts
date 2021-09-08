import React from 'react'

import { StdObj } from '../../types/general.types'
import CvViewCredential from './index'

export interface CvViewCredentialsData {
  ids: string[]
  entities: StdObj<Omit<React.ComponentProps<typeof CvViewCredential>, 'onEdit'>>
}

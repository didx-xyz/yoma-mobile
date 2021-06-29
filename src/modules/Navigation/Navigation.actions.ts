import * as React from 'react'

import { StdObj } from './../../types/general.types'

export const navigationRef: React.RefObject<any> = React.createRef()

export function navigate(name: string, params: StdObj = {}) {
  navigationRef.current?.navigate(name, params)
}

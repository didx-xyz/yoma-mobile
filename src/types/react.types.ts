import React from 'react'

export type WithChildren<T = {}> = T & { children?: React.ReactNode }
export interface FCWithChildren {
  children?: React.ReactNode
}

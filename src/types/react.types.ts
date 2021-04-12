import React from 'react'

export type WithChildren<T = {}> = T & { children?: React.ReactNode }
export type GetComponentProps<T> = T extends React.ComponentType<infer P> | React.Component<infer P> ? P : never

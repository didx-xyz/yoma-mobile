import { Colors } from '~/styles'

export interface Offset {
  x: number
  y: number
}

export interface Background {
  imageSrc?: number
  imageOffset?: Offset
  color?: Colors
}

export interface Content {
  title: string
  titleColor?: Colors
  body: string
  bodyColor?: Colors
  offset?: Offset
}

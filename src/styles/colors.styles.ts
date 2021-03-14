import { Colors } from './styles.types'

const greys = {
  black: '#131313',
  white: '#ffffff',
}

const PURPLE = 'rgb(70, 29, 77)'
const YELLOW = 'rgb(249, 171, 62)'
const RED = 'rgb(254, 77, 87)'
const GREEN = 'rgb(21, 175, 146)'

export default {
  [Colors.primary]: PURPLE,
  [Colors.secondary]: YELLOW,
  [Colors.tertiary1]: RED,
  [Colors.tertiary2]: GREEN,
  [Colors.white]: greys.white,
  [Colors.black]: greys.black,
}

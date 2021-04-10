import { Colors } from './styles.types'

const greys = {
  black: '#131313',
  white: '#ffffff',
}

const PURPLE = 'rgb(70, 29, 77)'
const YELLOW = 'rgb(249, 171, 62)'
const RED = 'rgb(254, 77, 87)'
const GREEN = 'rgb(21, 175, 146)'
const DARK_GREEN = 'rgb(56,127,106)'
const LIGHT_GREY = 'rgb(229,229,229)'
const DARK_GREY = 'rgb(86,91,111)'
const BLUE_VIOLET = 'rgb(95,101,185)'
const DARK_BLUE = 'rgb(22,42,66)'
const MEDIUM_GREY = 'rgb(241,244,248)'
const SANTAS_GREY = 'rgb(149,155,180)'

// TODO:needs to be updated to correct names
export default {
  [Colors.primary]: PURPLE,
  [Colors.secondary]: YELLOW,
  [Colors.tertiary1]: RED,
  [Colors.tertiary2]: GREEN,
  [Colors.tertiary3]: DARK_GREEN,
  [Colors.tertiary4]: LIGHT_GREY,
  [Colors.tertiary5]: DARK_GREY,
  [Colors.tertiary6]: BLUE_VIOLET,
  [Colors.tertiary7]: DARK_BLUE,
  [Colors.tertiary8]: MEDIUM_GREY,
  [Colors.tertiary9]: SANTAS_GREY,
  [Colors.white]: greys.white,
  [Colors.black]: greys.black,
}

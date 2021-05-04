import Body from './Body/Body'
import { BodyLevels } from './Body/Body.types'
import Bold from './Bold'
import Header from './Header/Header'
import { HeaderLevels } from './Header/Header.types'
import Link from './Link'
import Meta from './Meta/Meta'
import { MetaLevels } from './Meta/Meta.types'
import Span from './Span'
import { FontWeights, TextAlign } from './Text.types'

const Text = {
  Header,
  Body,
  Meta,
}

export default Text

export { Bold, Span, Link, HeaderLevels, BodyLevels, MetaLevels, FontWeights, TextAlign }

import { LinkingOptions, PathConfigMap } from '@react-navigation/native'

import Env from '~/env.json'
import { LandingParamsList } from '~/modules/Landing/Landing.types'

const screens: PathConfigMap<LandingParamsList> = {
  Authentication: {
    path: '',
    screens: {},
  },
}

const config = {
  screens: screens,
}

const linking: LinkingOptions<LandingParamsList> = {
  prefixes: [Env.YOMA_WEB_BASE_PATH],
  config,
}

export default linking

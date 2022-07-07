import { LinkingOptions, PathConfigMap } from '@react-navigation/native'

import Env from '~/env.json'
import { LandingParamsList, ParamsList } from '~/modules/Landing/Landing.types'

const screens: PathConfigMap<LandingParamsList> = {
  Authentication: {
    path: '',
    screens: {},
  },
}

const config = {
  screens,
}

const linking: LinkingOptions<ParamsList> = {
  prefixes: [Env.APP_SCHEME, Env.YOMA_WEB_BASE_PATH],
  config,
}

export default linking

import { LinkingOptions, PathConfigMap } from '@react-navigation/native'

import Env from '~/env.json'
import { LandingNavigationRoutes, LandingParamsList } from '~/modules/Landing/Landing.types'

const screens: PathConfigMap<LandingParamsList> = {
  Authentication: {
    path: '',
    screens: {},
  },
}

const config = {
  initialRouteName: LandingNavigationRoutes.Authentication,
  screens,
}

const linking: LinkingOptions<LandingParamsList> = {
  prefixes: [Env.APP_SCHEME, Env.YOMA_WEB_BASE_PATH],
  config,
}

export default linking

import { LinkingOptions, PathConfigMap } from '@react-navigation/native'

import Env from '../../env.json'

const screens: PathConfigMap = {
  Authentication: {
    path: '',
    screens: {
      ResetPassword: {
        path: 'auth/reset-password',
        parse: {
          // TODO: Need to check this + sign becomes empty
          Token: (Token: string) => `${Token.replace(/ /g, '+')}`,
          Id: (Id: string) => `${Id}`,
        },
      },
    },
  },
}

const config = {
  screens: screens,
}

const linking: LinkingOptions = {
  prefixes: [Env.YOMA_WEB_BASE_PATH],
  config,
}

export default linking

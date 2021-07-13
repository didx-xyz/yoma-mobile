import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { AccessToken, LoginManager, Profile } from 'react-native-fbsdk-next'

import { Providers } from './SSOAuth.types'
import { onFacebookAuth, onGoogleAuth } from './SSOAuth.utils'

export default (provider: string) => {
  switch (provider) {
    case Providers.Facebook:
      return onFacebookAuth({ fbLoginManager: LoginManager, fbProfile: Profile, fbAccessToken: AccessToken })
    case Providers.Google:
      return onGoogleAuth({ googleSignIn: GoogleSignin })
  }
}

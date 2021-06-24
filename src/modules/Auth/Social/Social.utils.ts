import { User } from '@react-native-google-signin/google-signin'
import { FBAccessToken } from 'react-native-fbsdk-next/types/FBAccessToken'
import { FBProfile } from 'react-native-fbsdk-next/types/FBProfile'

import { AuthSocialRegistrationCredentials } from '../Auth.types'

export const selectUserDataFromFacebookAuth = (user: FBProfile | null, token: FBAccessToken | null | undefined) =>
  user && token
    ? ({
        provider: 'facebook',
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        providerKey: user.userID,
        token: token.accessToken,
      } as AuthSocialRegistrationCredentials)
    : null

export const selectUserDataFromGoogleAuth = (data: User) =>
  ({
    provider: 'google',
    email: data.user.email,
    firstName: data.user.givenName,
    lastName: data.user.familyName,
    providerKey: data.user.id,
    token: data.idToken,
  } as AuthSocialRegistrationCredentials)

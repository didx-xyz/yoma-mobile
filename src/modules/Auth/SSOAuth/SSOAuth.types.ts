import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import { AccessToken, LoginManager, Profile } from 'react-native-fbsdk-next'

export enum Providers {
  Google = 'google',
  Facebook = 'facebook',
}

export type facebookAuthDependencies = {
  fbLoginManager: typeof LoginManager
  fbProfile: typeof Profile
  fbToken: typeof AccessToken
}
export type googleAuthDependencies = {
  googleSignIn: typeof GoogleSignin
  googleStatusCodes: typeof statusCodes
}

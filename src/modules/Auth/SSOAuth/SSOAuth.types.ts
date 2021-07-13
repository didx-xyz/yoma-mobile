import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import { AccessToken, LoginManager, Profile } from 'react-native-fbsdk-next'

export enum Providers {
  Google = 'google',
  Facebook = 'facebook',
}

export type FacebookAuthDependencies = {
  fbLoginManager: typeof LoginManager
  fbProfile: typeof Profile
  fbAccessToken: typeof AccessToken
}
export type GoogleAuthDependencies = {
  googleSignIn: typeof GoogleSignin
  googleStatusCodes: typeof statusCodes
}

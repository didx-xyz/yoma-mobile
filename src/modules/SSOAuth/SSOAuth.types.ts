import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { AccessToken, LoginManager, Profile } from 'react-native-fbsdk-next'

export enum Providers {
  Google = 'google',
  Facebook = 'facebook',
}

export type FacebookAuthDependencies = {
  fbLoginManager: typeof LoginManager | any
  fbProfile: typeof Profile | any
  fbAccessToken: typeof AccessToken | any
  fbAuthCancelledErrorMessage?: string
}
export type GoogleAuthDependencies = {
  googleSignIn: typeof GoogleSignin | any
}

export enum Providers {
  Google = 'google',
  Facebook = 'facebook',
}

export type FacebookAuthDependencies = {
  fbLoginManager: any
  fbProfile: any
  fbAccessToken: any
}
export type GoogleAuthDependencies = {
  googleSignIn: any
  googleStatusCodes: any
}

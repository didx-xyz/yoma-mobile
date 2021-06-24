import { facebookSignIn, googleSignIn } from './Social.config'

export default (type: string) => {
  switch (type) {
    case 'facebook':
      return facebookSignIn()
    case 'google':
      return googleSignIn()
  }
}

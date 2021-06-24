import { facebookSignIn, googleSignIn } from './Social.config'
import { Providers } from './Social.types'

export default (provider: string) => {
  switch (provider) {
    case Providers.Facebook:
      return facebookSignIn()
    case Providers.Google:
      return googleSignIn()
  }
}

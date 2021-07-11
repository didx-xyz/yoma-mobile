import { Colors } from '../../styles'
import { SocialVariants } from './SocialButton.types'

export const MAP_VARIANT_TO_OPTIONS = {
  [SocialVariants.Facebook]: {
    color: Colors.white,
    icon: 'FacebookIcon',
    translationKey: 'loginFacebook',
  },
  [SocialVariants.Google]: {
    color: Colors.primaryDarkGrey,
    icon: 'GoogleIcon',
    translationKey: 'loginGoogle',
  },
}

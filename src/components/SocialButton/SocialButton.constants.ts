import { FacebookIcon, GoogleIcon } from '../../assets/images'
import { Colors } from '../../styles'
import { SocialVariants } from './SocialButton.types'

export const MAP_VARIANT_TO_OPTIONS = {
  [SocialVariants.Facebook]: {
    color: Colors.White,
    icon: FacebookIcon,
    translationKey: 'loginFacebook',
  },
  [SocialVariants.Google]: {
    color: Colors.PrimaryDarkGrey,
    icon: GoogleIcon,
    translationKey: 'loginGoogle',
  },
}

import React from 'react'

import SocialButton from '../SocialButton'
import { SocialVariants } from '../SocialButton/SocialButton.types'
import Spacer from '../Spacer'

type Props = {
  onRegisterWithSocial: (authProvider: string) => void
}
const SocialRegistration = ({ onRegisterWithSocial }: Props) => {
  return (
    <>
      <SocialButton variant={SocialVariants.Facebook} onPress={() => onRegisterWithSocial('facebook')} />
      <Spacer height={20} />
      <SocialButton variant={SocialVariants.Google} onPress={() => onRegisterWithSocial('google')} />
    </>
  )
}

export default SocialRegistration

import React from 'react'

import SocialButton from '../SocialButton'
import { SocialVariants } from '../SocialButton/SocialButton.types'
import Spacer from '../Spacer'

type Props = {
  onRegisterWithSocial: (authProvider: SocialVariants) => void
}
const SocialRegistration = ({ onRegisterWithSocial }: Props) => {
  return (
    <>
      <SocialButton variant={SocialVariants.Facebook} onPress={() => onRegisterWithSocial(SocialVariants.Facebook)} />
      <Spacer height={20} />
      <SocialButton variant={SocialVariants.Google} onPress={() => onRegisterWithSocial(SocialVariants.Google)} />
    </>
  )
}

export default SocialRegistration

import React from 'react'

import SocialButton from '../SocialButton'
import { SocialVariants } from '../SocialButton/SocialButton.types'
import Spacer from '../Spacer'

type Props = {
  onAuthWithSocial: (authProvider: SocialVariants) => void
}
const SSO = ({ onAuthWithSocial }: Props) => {
  return (
    <>
      <SocialButton variant={SocialVariants.Facebook} onPress={() => onAuthWithSocial(SocialVariants.Facebook)} />
      <Spacer height={20} />
      <SocialButton variant={SocialVariants.Google} onPress={() => onAuthWithSocial(SocialVariants.Google)} />
    </>
  )
}

export default SSO

import SocialButton from 'components/SocialButton'
import { SocialVariants } from 'components/SocialButton/SocialButton.types'
import Spacer from 'components/Spacer'
import React from 'react'

type Props = {
  onLoginWithSocial: (type: string) => void
}

const SocialLogin = ({ onLoginWithSocial }: Props) => {
  return (
    <>
      <SocialButton variant={SocialVariants.Facebook} onPress={() => onLoginWithSocial('facebook')} />
      <Spacer height={20} />
      <SocialButton variant={SocialVariants.Google} onPress={() => onLoginWithSocial('google')} />
    </>
  )
}

export default SocialLogin

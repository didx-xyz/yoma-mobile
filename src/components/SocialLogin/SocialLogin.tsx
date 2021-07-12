import SocialButton from 'components/SocialButton'
import { SocialVariants } from 'components/SocialButton/SocialButton.types'
import Spacer from 'components/Spacer'
import React from 'react'

const SocialLogin = () => {
  return (
    <>
      <SocialButton variant={SocialVariants.Facebook} onPress={() => {}} />
      <Spacer height={20} />
      <SocialButton variant={SocialVariants.Google} onPress={() => {}} />
    </>
  )
}

export default SocialLogin

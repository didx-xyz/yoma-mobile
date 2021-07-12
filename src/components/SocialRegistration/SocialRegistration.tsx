import React from 'react'

import SocialButton from '../SocialButton'
import { SocialVariants } from '../SocialButton/SocialButton.types'
import Spacer from '../Spacer'

const SocialRegistration = () => {
  return (
    <>
      <SocialButton variant={SocialVariants.Facebook} onPress={() => {}} />
      <Spacer height={20} />
      <SocialButton variant={SocialVariants.Google} onPress={() => {}} />
    </>
  )
}

export default SocialRegistration

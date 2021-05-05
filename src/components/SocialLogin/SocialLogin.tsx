import { GoogleSignin } from '@react-native-google-signin/google-signin'
import SocialButton from 'components/SocialButton'
import { SocialVariants } from 'components/SocialButton/SocialButton.types'
import Spacer from 'components/Spacer'
import React from 'react'
import { LoginManager } from 'react-native-fbsdk'

const SocialLogin = () => {
  const facebookSignIn = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled')
        } else {
          console.log('Login success with permissions: ' + result.grantedPermissions?.toString())
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error)
      },
    )
  }

  const googleSignIn = async () => {
    try {
      await GoogleSignin.configure()
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      console.log('User Info', userInfo)
    } catch (error) {
      console.log('User error', error)
    }
  }

  return (
    <>
      <SocialButton variant={SocialVariants.Facebook} onPress={facebookSignIn} />
      <Spacer height={20} />
      <SocialButton variant={SocialVariants.Google} onPress={googleSignIn} />
    </>
  )
}

export default SocialLogin

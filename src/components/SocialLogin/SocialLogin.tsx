import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { FacebookIcon, GoogleIcon } from 'assets/images'
import React from 'react'
import { LoginManager } from 'react-native-fbsdk'
import ButtonStyles from 'styles/button.styles'

import ButtonContainer from '../ButtonContainer/ButtonContainer'
import styles from './SocialLogin.styles'

const SocialLogin = () => {
  const facebookSignin = () => {
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
      <ButtonContainer
        buttonText="Continue with Facebook"
        buttonStyle={[ButtonStyles.facebookButton, styles.button]}
        onPress={facebookSignin}
        children={<FacebookIcon />}
      />
      <ButtonContainer
        buttonText="Continue with Google  "
        buttonStyle={[ButtonStyles.googleButton, styles.button]}
        onPress={googleSignIn}
        children={<GoogleIcon />}
      />
    </>
  )
}

export default SocialLogin

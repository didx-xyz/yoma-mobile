import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import React from 'react'
import { LoginManager } from 'react-native-fbsdk'

import SocialButton from '../SocialButton'
import { SocialVariants } from '../SocialButton/SocialButton.types'
import Spacer from '../Spacer'

const SocialRegistration = () => {
  const facebookSignIn = () => {
    LoginManager.logInWithPermissions(['email', 'public_profile', 'user_friends']).then(
      function (result) {
        console.log('🚀 ~ file: SocialRegistration.tsx ~ line 18 ~ facebookSignIn ~ result', result)
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
      await GoogleSignin.configure({
        webClientId: '965688966068-r3vliuj5v5ojgppnspfaejuocfgqe3e7.apps.googleusercontent.com', // client ID of type WEB for your server(needed to verify user ID and offline access)
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
        accountName: '', // [Android] specifies an account name on the device that should be used
      })
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      console.log('User Info', userInfo)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('SIGN_IN_CANCELLED', error)
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('IN_PROGRESS', error)
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('PLAY_SERVICES_NOT_AVAILABLE', error)
        // play services not available or outdated
      } else {
        console.log('error', error)
        // some other error happened
      }
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

export default SocialRegistration

import React from 'react'
import { LoginManager } from "react-native-fbsdk";
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import ButtonStyles from '../../styles/button.styles';
import { TextStyles } from '../../styles';
import FacebookIcon from '../../assets/Images/FacebookIcon.svg';
import GoogleIcon from '../../assets/Images/GoogleIcon.svg';
import ButtonContainer from '../ButtonContainer/ButtonContainer';

const SocialRegistration = () => {


  const facebookSignin = () => {
    LoginManager.logInWithPermissions(["public_profile"]).then(
      function (result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          console.log(
            "Login success with permissions: " +
            result.grantedPermissions?.toString()
          );
        }
      },
      function (error) {
        console.log("Login fail with error: " + error);
      }
    );
  }

  const googleSignIn = async () => {
    try {
      await GoogleSignin.configure();
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("User Info", userInfo)
    } catch (error) {
      console.error("googleSignIn error", error)
    }
  }

  return (
    <>
      <ButtonContainer
        buttonText="Continue with Facebook"
        buttonStyle={[ButtonStyles.facebookButton, { marginVertical: 15 }]}
        buttonTextStyle={[TextStyles.textWhite, TextStyles.buttonText]}
        onPress={facebookSignin}
        children={<FacebookIcon />}
      />
      <ButtonContainer
        buttonText="Continue with Google  "
        buttonStyle={[ButtonStyles.googleButton, { marginVertical: 15 }]}
        buttonTextStyle={[TextStyles.textTertiary5, TextStyles.buttonText]}
        onPress={googleSignIn}
        children={<GoogleIcon />}
      />
    </>
  )
}

export default SocialRegistration

import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

import ViewContainer from '../../components/ViewContainer/ViewContainer'
import { Colors, colors, TextStyles } from '../../styles';
import styles from './ForgotPassword.styles'
import YellowCircleRight from '../../assets/Images/YellowCircleRight.svg';
import LargeHeaderContainer from '../../components/LargeHeaderContainer/LargeHeaderContainer';
import ForgotPasswordForm from './ForgotPasswordForm/ForgotPasswordForm';
import ButtonContainer from '../../components/ButtonContainer/ButtonContainer';
import ButtonStyles from '../../styles/button.styles';
import Message from '../../assets/Images/Message.svg';
import { openInbox } from "react-native-email-link";

interface Props {
  navigation: any
}

const ForgotPassword = ({ navigation }: Props) => {
  const [emailSent, setEmailSent] = useState(false)

  return (
    <ViewContainer style={styles.container}>
      <ScrollView contentContainerStyle={{
        paddingBottom: 30,
      }}>
        <LargeHeaderContainer
          headerText="Forgot password"
          backgroundColor={colors[Colors.tertiary6]}
          circleImage={<YellowCircleRight />}
          circleImageStyle={styles.yellowSemiCircleContainer}
        />
        {
          !emailSent ?
            <View style={styles.whiteCard}>
              <Text style={TextStyles.cardHeaderText}>
                Forgot your password?
              </Text>
              <Text style={[
                TextStyles.h4,
                TextStyles.textTertiary5,
                styles.bodyText
              ]}>
                Enter your email and we’ll send you an email with instructions to reset your password.
              </Text>
              <ForgotPasswordForm setSubmitted={() => setEmailSent(true)} />
            </View> :
            <View style={styles.whiteCard}>
              <Text style={TextStyles.cardHeaderText}>
                Check your mail
              </Text>
              <View style={styles.logoContainer}>
                <Message />
              </View>
              <Text style={[
                TextStyles.h4,
                TextStyles.textTertiary5,
                { marginVertical: 15, textAlign: 'center', paddingHorizontal: 20 }
              ]}>We have sent you password recover instructions to your email. </Text>
              <ButtonContainer
                buttonText="Open email app"
                buttonStyle={[ButtonStyles.largeTertiary3Button, { marginVertical: 15, alignSelf: 'center' }]}
                buttonTextStyle={[TextStyles.textWhite, TextStyles.buttonText]}
                onPress={() => openInbox()}
              />
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={[
                  TextStyles.buttonText,
                  TextStyles.textTertiary3,
                  { marginVertical: 5 }
                ]}>Skip and complete later</Text>
              </TouchableOpacity>
            </View>
        }
      </ScrollView>
    </ViewContainer>
  );
}

export default ForgotPassword

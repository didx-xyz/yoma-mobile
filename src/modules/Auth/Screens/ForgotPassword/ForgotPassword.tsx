import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { openInbox } from "react-native-email-link";
import styles from './ForgotPassword.styles'
import { colors, Colors, TextStyles } from 'styles';
import ButtonStyles from 'styles/button.styles';
import { YellowCircleRight, Message } from 'assets/Images';
import { ViewContainer, LargeHeaderContainer, ButtonContainer } from 'components';
import ForgotPasswordForm from './ForgotPasswordForm/ForgotPasswordForm';

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
          navigation={navigation}
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

import { YellowCircleLeft } from 'assets/Images';
import { LargeHeaderContainer, SocialRegistration, ViewContainer } from 'components';
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { colors, Colors, TextStyles } from 'styles';
import styles from './Login.styles'
import LoginForm from './LoginForm/LoginForm';

interface Props {
  navigation: any
}

const Login = ({ navigation }: Props) => {
  return (
    <ViewContainer style={styles.container}>
      <ScrollView>
        <LargeHeaderContainer
          navigation={navigation}
          headerText="Login"
          backgroundColor={colors[Colors.primary]}
          circleImage={<YellowCircleLeft />}
          circleImageStyle={styles.yellowSemiCircleContainer}
        />
        <View style={styles.whiteCard}>
          <Text style={TextStyles.cardHeaderText}>
            Welcome back
          </Text>
          <LoginForm />
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={[
              TextStyles.h5,
              TextStyles.textTertiary5,
              { marginVertical: 5 }
            ]}>Forgot password ?</Text>
          </TouchableOpacity>
          <View style={styles.horizontalLineView}>
            <View style={styles.horizontalLine} />
            <Text style={[
              TextStyles.h3,
              TextStyles.textTertiary5,
              { paddingHorizontal: 15 }
            ]}>or</Text>
            <View style={styles.horizontalLine} />
          </View>
          <Text style={[
            TextStyles.h5,
            TextStyles.textTertiary5,
            { marginTop: 15 }
          ]}>Login with your social account</Text>
          <SocialRegistration />
        </View>
        <Text style={[
          TextStyles.h5,
          TextStyles.textTertiary5,
          { textAlign: 'center', marginVertical: 30 }
        ]}>
          No account yet ?
          <Text style={[
            TextStyles.buttonText,
            TextStyles.textTertiary3,
            { textAlign: 'center' }
          ]}
            onPress={() => navigation.navigate('Register')}
          >&nbsp;  Register here.</Text>
        </Text>
      </ScrollView>
    </ViewContainer>
  );
}

export default Login

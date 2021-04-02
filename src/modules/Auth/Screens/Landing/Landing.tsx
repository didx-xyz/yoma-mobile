import React from 'react'
import { Text, View } from 'react-native'
import styles from './Landing.styles';
import { TextStyles } from 'styles';
import ButtonStyles from 'styles/button.styles';
import { RedSemiCircle, WhiteLogo, PurpleSemiCircle } from 'assets/Images';
import { ButtonContainer, ViewContainer } from 'components';

interface Props {
  navigation: any
}

const Landing = ({ navigation }: Props) => {
  return (
    <ViewContainer style={styles.container}>
      <View style={styles.redSemiCircleContainer}>
        <RedSemiCircle />
      </View>
      <View style={styles.logoContainer}>
        <WhiteLogo />
      </View>
      <Text style={[TextStyles.h1, TextStyles.textPrimary, styles.mainBodyText]}>
        Unlock{'\n'}
        <Text style={[TextStyles.h1, TextStyles.textWhite]}>your future</Text>
      </Text>
      <Text style={[TextStyles.h4, TextStyles.textWhite, styles.bodyText]}>
        Build and transform your future by unlocking your hidden potential.
      </Text>
      <View style={styles.purpleSemiCircleContainer} >
        <PurpleSemiCircle />
      </View>
      <View style={styles.buttonOuterContainer}>
        <ButtonContainer
          buttonText="Register"
          buttonStyle={[ButtonStyles.mediumTertiary3Button]}
          buttonTextStyle={[TextStyles.textWhite, TextStyles.buttonText]}
          onPress={() => navigation.navigate('Register')}
        />
        <ButtonContainer
          buttonText="Login"
          buttonStyle={[ButtonStyles.transparentButton, { marginTop: 10 }]}
          buttonTextStyle={[TextStyles.textWhite, TextStyles.buttonText]}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </ViewContainer>
  );
}

export default Landing

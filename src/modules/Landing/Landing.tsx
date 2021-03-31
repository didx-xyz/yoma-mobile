import React from 'react'
import { Text, View } from 'react-native'
import RedSemiCircle from '../../assets/Images/RedSemiCircle.svg';
import PurpleSemiCircle from '../../assets/Images/PurpleSemiCircle.svg';
import WhiteLogo from '../../assets/Images/WhiteLogo.svg';

import ViewContainer from '../../components/ViewContainer/ViewContainer'
import { TextStyles } from '../../styles';
import styles from './Landing.styles'
import ButtonContainer from '../../components/ButtonContainer/ButtonContainer';
import ButtonStyles from '../../styles/button.styles';

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
      <Text style={[TextStyles.h1, TextStyles.textPrimary]}>
        Unlock
      </Text>
      <Text style={[TextStyles.h1, TextStyles.textWhite]}>your future</Text>
      <Text style={[TextStyles.h4, TextStyles.textWhite, styles.bodyText]}>
        Build and transform your future by unlocking your hidden potential.
      </Text>
      <View style={styles.purpleSemiCircleContainer} >
        <PurpleSemiCircle />
      </View>
      <View style={styles.buttonOuterContainer}>
        <ButtonContainer
          buttonText="Register"
          buttonStyle={[ButtonStyles.tertiary3Button]}
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

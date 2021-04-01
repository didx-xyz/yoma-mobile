import React from 'react'
import { Text, View } from 'react-native'

import ViewContainer from '../../components/ViewContainer/ViewContainer'
import { Colors, colors, TextStyles } from '../../styles';
import styles from './Register.styles'
import ButtonContainer from '../../components/ButtonContainer/ButtonContainer';
import ButtonStyles from '../../styles/button.styles';
import PurpleQuarter from '../../assets/Images/PurpleQuarter.svg';
import LargeHeaderContainer from '../../components/LargeHeaderContainer/LargeHeaderContainer';
import SocialRegistration from '../../components/SocialRegistration/SocialRegistration';

interface Props {
  navigation: any
}

const Register = ({ navigation }: Props) => {
  return (
    <ViewContainer style={styles.container}>
      <LargeHeaderContainer
        navigation={navigation}
        headerText="Register"
        backgroundColor={colors[Colors.secondary]}
        circleImage={<PurpleQuarter />}
        circleImageStyle={styles.purpleSemiCircleContainer}
      />
      <View style={styles.whiteCard}>
        <Text style={TextStyles.cardHeaderText}>
          Welcome
        </Text>
        <ButtonContainer
          buttonText="Register with email"
          buttonStyle={[ButtonStyles.largeTertiary3Button, { marginVertical: 15 }]}
          buttonTextStyle={[TextStyles.textWhite, TextStyles.buttonText]}
          onPress={() => navigation.navigate('RegisterWithEmail')}
        />
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
        ]}>Register with your social account</Text>
        <SocialRegistration />
      </View>
      <Text style={[
        TextStyles.h5,
        TextStyles.textTertiary5,
        { textAlign: 'center', marginTop: 30 }
      ]}>
        Already have an account ?
        <Text style={[
          TextStyles.buttonText,
          TextStyles.textTertiary3,
          { textAlign: 'center' }
        ]}
          onPress={() => navigation.navigate('Login')}
        >&nbsp; Login.</Text>
      </Text>
    </ViewContainer>
  );
}

export default Register

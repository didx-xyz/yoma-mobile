import React from 'react'
import { Text, ScrollView, View } from 'react-native'
import ViewContainer from '../../components/ViewContainer/ViewContainer'
import { Colors, colors, TextStyles } from '../../styles';
import styles from './RegisterWithEmail.styles'
import YellowCircleRight from '../../assets/Images/YellowCircleRight.svg';
import LargeHeaderContainer from '../../components/LargeHeaderContainer/LargeHeaderContainer';
import RegisterForm from './RegisterForm/RegisterForm';

interface Props {
  navigation: any
}

const RegisterWithEmail = ({ navigation }: Props) => {

  return (
    <ViewContainer style={styles.container}>
      <ScrollView>
        <LargeHeaderContainer
          headerText="Register"
          backgroundColor={colors[Colors.tertiary6]}
          circleImage={<YellowCircleRight />}
          circleImageStyle={styles.yellowCircleContainer}
        />
        <View style={styles.whiteCard}>
          <Text style={[TextStyles.cardHeaderText, { alignSelf: 'center' }]}>
            Register
          </Text>
          <RegisterForm />
        </View>
        <Text style={[
          TextStyles.h5,
          TextStyles.textTertiary5,
          { textAlign: 'center', marginVertical: 30 }
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
      </ScrollView>
    </ViewContainer>
  );
}

export default RegisterWithEmail

import { YellowCircleRight } from 'assets/Images';
import { LargeHeaderContainer, ViewContainer } from 'components';
import React from 'react'
import { Text, ScrollView, View } from 'react-native'
import { Colors, colors, TextStyles } from 'styles';
import RegisterForm from './RegisterForm/RegisterForm';
import styles from './RegisterWithEmail.styles'

interface Props {
  navigation: any
}

const RegisterWithEmail = ({ navigation }: Props) => {

  return (
    <ViewContainer style={styles.container}>
      <ScrollView>
        <LargeHeaderContainer
          navigation={navigation}
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

import { YellowCircleLeft } from 'assets/Images';
import { LargeHeaderContainer, SocialRegistration, ViewContainer } from 'components';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { colors, Colors, TextStyles } from 'styles';
import styles from './Login.styles'
import LoginForm from './LoginForm/LoginForm';

interface Props {
  navigation: any
}

const Login = ({ navigation }: Props) => {
  const { t } = useTranslation();
  return (
    <ViewContainer style={styles.container}>
      <ScrollView>
        <LargeHeaderContainer
          navigation={navigation}
          headerText={t("login")}
          backgroundColor={colors[Colors.primary]}
          circleImage={<YellowCircleLeft />}
          circleImageStyle={styles.yellowSemiCircleContainer}
        />
        <View style={styles.whiteCard}>
          <Text style={TextStyles.cardHeaderText}>
            {t('welcomeBack')}
          </Text>
          <LoginForm />
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={[
              TextStyles.h5,
              TextStyles.textTertiary5,
              { marginVertical: 5 }
            ]}>{t('forgotPassword')} ?</Text>
          </TouchableOpacity>
          <View style={styles.horizontalLineView}>
            <View style={styles.horizontalLine} />
            <Text style={[
              TextStyles.h3,
              TextStyles.textTertiary5,
              { paddingHorizontal: 15 }
            ]}>{t('or')}</Text>
            <View style={styles.horizontalLine} />
          </View>
          <Text style={[
            TextStyles.h5,
            TextStyles.textTertiary5,
            { marginTop: 15 }
          ]}>{t('loginSocial')}</Text>
          <SocialRegistration />
        </View>
        <Text style={[
          TextStyles.h5,
          TextStyles.textTertiary5,
          { textAlign: 'center', marginVertical: 30 }
        ]}>
          {t("noAccount")}
          <Text style={[
            TextStyles.buttonText,
            TextStyles.textTertiary3,
            { textAlign: 'center' }
          ]}
            onPress={() => navigation.navigate('Register')}
          >&nbsp; {t('registerHere')}.</Text>
        </Text>
      </ScrollView>
    </ViewContainer>
  );
}

export default Login

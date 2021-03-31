import React, { useEffect, useState } from 'react'
import { Text, View, Button, ScrollView } from 'react-native'
import LargeHeaderContainer from '../../components/LargeHeaderContainer/LargeHeaderContainer'

import ViewContainer from '../../components/ViewContainer/ViewContainer'
import { colors, Colors, TextStyles } from '../../styles'
import styles from './ResetPassword.styles'
import PurpleQuarter from '../../assets/Images/PurpleQuarter.svg';
import ResetPasswordForm from './ResetPasswordForm/ResetPasswordForm'

interface Props {
  navigation: any,
  route: any
}

const ResetPassword = ({ navigation, route }: Props) => {
  const {
    params: { Token, Id },
  } = route;
  useEffect(() => {
    if (!Token || !Id) {
      navigation.navigate("Login");
    }
  }, [Token, Id])
  return (
    <ViewContainer style={styles.container}>
      <ScrollView contentContainerStyle={{
        paddingBottom: 30,
      }}>
        <LargeHeaderContainer
          headerText=""
          backgroundColor={colors[Colors.secondary]}
          circleImage={<PurpleQuarter />}
          circleImageStyle={styles.purpleSemiCircleContainer}
        />
        <View style={styles.whiteCard}>
          <Text style={TextStyles.cardHeaderText}>
            Create new password
          </Text>
          <Text style={[
            TextStyles.h4,
            TextStyles.textTertiary5,
            styles.bodyText
          ]}>
            Your new password must be
            <Text style={{ fontWeight: 'bold' }}> different </Text>
            from the previous passwords and at least
            <Text style={{ fontWeight: 'bold' }}> 8 characters.</Text>
          </Text>
          <ResetPasswordForm
            id={Id}
            token={Token}
            navigation={navigation}
          />
        </View>
      </ScrollView>
    </ViewContainer>
  );
}

export default ResetPassword

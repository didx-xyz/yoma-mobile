import React, { useEffect } from 'react'
import { BackHandler, Text, TouchableOpacity, View } from 'react-native'
import { TextStyles } from '../../styles'
import BackIcon from '../../assets/Images/BackIcon.svg';

import { WithChildren } from '../../types/react.types'
import styles from './HeaderContainer.styles'
import { StackActions } from '@react-navigation/native';

type Props = WithChildren<{
  headerText: string,
  navigation: any
}>

const HeaderContainer = ({
  headerText,
  navigation
}: Props) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      goBack();
      return true;
    });
    return () => backHandler.remove();
  }, [])

  const goBack = () => {
    navigation.dispatch(
      StackActions.pop(1)
    );
  }

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backIconView} onPress={goBack}>
        <BackIcon />
      </TouchableOpacity>
      <Text
        style={[
          TextStyles.textWhite,
          TextStyles.headerText
        ]}>
        {headerText}
      </Text>
    </View>
  )
}

export default HeaderContainer

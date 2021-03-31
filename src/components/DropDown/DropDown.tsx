import React from 'react'
import { Text, View } from 'react-native'
import { TextStyles } from '../../styles'
import DropDownPicker, { DropDownPickerProps } from 'react-native-dropdown-picker';

import styles from './DropDown.styles'

type Props = DropDownPickerProps & {
  touched?: boolean,
  error?: any
};

const DropDown = ({
  touched,
  error,
  ...props
}: Props) => {
  return (
    <View>
      <DropDownPicker
        containerStyle={{ height: 45, marginTop: 15 }}
        style={styles.dropDownStyle}
        dropDownStyle={styles.dropDownViewStyle}
        labelStyle={[TextStyles.h4, TextStyles.textTertiary5]}
        itemStyle={{
          justifyContent: 'flex-start'
        }}
        {...props}
      />
      <Text style={TextStyles.errorText}>{touched && error}</Text>
    </View>
  );
};

export default DropDown

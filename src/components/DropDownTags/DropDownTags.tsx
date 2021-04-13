import { CrossIcon } from 'assets/images'
import Text, { MetaLevels, TextAlign } from 'components/Typography'
import React from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import DropDownPicker, { DropDownPickerProps } from 'react-native-dropdown-picker'
import { Colors, TextStyles } from 'styles'

import styles from './DropDownTags.styles'

type Props = DropDownPickerProps & {
  touched?: any
  error?: any
  fieldName?: string
  showTitle?: boolean
  tags?: Array<string>
  deleteItem?: (tag: string) => void
}

const rendertags = (tags: Array<string>, deleteItem: any) => {
  return tags.map((tag, index) => {
    return (
      <View key={index} style={styles.tag}>
        <TouchableOpacity style={styles.crossIcon} onPress={() => deleteItem(tag)}>
          <CrossIcon height={15} width={15} />
        </TouchableOpacity>
        <Text.Body color={Colors.primaryBlue} key={index}>
          {tag}
        </Text.Body>
      </View>
    )
  })
}

const DropDownTags = ({ touched, error, fieldName, showTitle, tags = [], deleteItem, ...props }: Props) => {
  return (
    <View>
      {showTitle ? (
        <Text.Meta level={MetaLevels.small} style={styles.label}>
          {fieldName}
        </Text.Meta>
      ) : null}
      <DropDownPicker
        containerStyle={styles.dropDownContainerStyle}
        style={styles.dropDownStyle}
        dropDownStyle={styles.dropDownViewStyle}
        labelStyle={[TextStyles.h4, TextStyles.textTertiary5]}
        itemStyle={styles.itemStyle}
        dropDownMaxHeight={200}
        {...props}
      />
      <ScrollView horizontal>{rendertags(tags, deleteItem)}</ScrollView>
      <Text.Meta color={Colors.primaryRed} align={TextAlign.center}>
        {touched && error}
      </Text.Meta>
    </View>
  )
}

export default DropDownTags

import { CrossIcon } from 'assets/Images'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import DropDownPicker, { DropDownPickerProps } from 'react-native-dropdown-picker'
import { TextStyles } from 'styles'

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
        <Text key={index} style={[TextStyles.h4, styles.tagText]}>
          {tag}
        </Text>
      </View>
    )
  })
}

const DropDownTags = ({ touched, error, fieldName, showTitle, tags = [], deleteItem, ...props }: Props) => {
  return (
    <View>
      {showTitle ? <Text style={[TextStyles.h4, styles.label, { paddingLeft: 10 }]}>{fieldName}</Text> : null}
      <DropDownPicker
        containerStyle={styles.dropDownContainerStyle}
        style={styles.dropDownStyle}
        dropDownStyle={styles.dropDownViewStyle}
        labelStyle={[TextStyles.h4, TextStyles.textTertiary5]}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownMaxHeight={200}
        {...props}
      />
      <ScrollView horizontal>{rendertags(tags, deleteItem)}</ScrollView>
      <Text style={TextStyles.errorText}>{touched && error}</Text>
    </View>
  )
}

export default DropDownTags

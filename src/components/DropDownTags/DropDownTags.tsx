import { CrossIcon } from 'assets/Images'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import DropDownPicker, { DropDownPickerProps } from 'react-native-dropdown-picker'
import { TextStyles } from 'styles'

import styles from './DropDownTags.styles'

type Props = DropDownPickerProps & {
  fieldName?: string
  showTitle?: boolean
  tags?: Array<string>
  deleteItem?: (tag: string) => void
}

const rendertags = (tags: Array<string>, deleteItem: any) => {
  return tags.map((tag, index) => {
    return (
      <View style={styles.tag}>
        <TouchableOpacity style={styles.crossIcon} onPress={() => deleteItem(tag)}>
          <CrossIcon height={15} width={15} />
        </TouchableOpacity>
        <Text key={index}>{tag}</Text>
      </View>
    )
  })
}

const DropDownTags = ({ fieldName, showTitle, tags = [], deleteItem, ...props }: Props) => {
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
    </View>
  )
}

export default DropDownTags

import { CrossIcon } from 'assets/images'
import { FormikErrors } from 'formik'
import React from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import DropDownPicker, { DropDownPickerProps } from 'react-native-dropdown-picker'
import { Colors } from 'styles'

import Optional from '../Optional'
import Text, { MetaLevels, TextAlign } from '../Typography'
import { DROP_DOWN_MAX_HEIGHT } from './DropDownTags.constants'
import styles from './DropDownTags.styles'

type Props = DropDownPickerProps & {
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[]
  fieldName?: string
  showTitle?: boolean
  tags?: string[]
  onDelete: (tag: string) => void
}

const rendertags = (tags: string[], onDelete: (tag: string) => void) => {
  return tags.map((tag, index) => {
    return (
      <View key={index} style={styles.tag}>
        <TouchableOpacity style={styles.crossIcon} onPress={() => onDelete(tag)}>
          <CrossIcon height={15} width={15} />
        </TouchableOpacity>
        <Text.Body color={Colors.primaryBlue} key={index}>
          {tag}
        </Text.Body>
      </View>
    )
  })
}

const DropDownTags = ({ error, fieldName, showTitle = false, tags = [], onDelete, ...props }: Props) => {
  return (
    <View>
      <Optional condition={showTitle}>
        <Text.Meta level={MetaLevels.small}>{fieldName}</Text.Meta>
      </Optional>
      <DropDownPicker
        containerStyle={styles.dropDownContainer}
        style={styles.dropDown}
        itemStyle={styles.item}
        dropDownMaxHeight={DROP_DOWN_MAX_HEIGHT}
        {...props}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {rendertags(tags, onDelete)}
      </ScrollView>
      <Text.Meta color={Colors.primaryRed} align={TextAlign.center}>
        {error}
      </Text.Meta>
    </View>
  )
}

export default DropDownTags

import React from 'react'
import { View, TextStyle, ViewStyle } from 'react-native'
import Tags from 'react-native-tags'
import { Colors, colors } from 'styles'

import styles from './TagInput.styles'

type TagInputProps = {
  initialText: string
  initialTags: string[] | undefined
  onChangeTags: any
  onTagPress: any
  renderTag: any
  viewStyle?: ViewStyle
}

const TagInput = ({
  initialText = '',
  initialTags = [],
  onChangeTags,
  onTagPress,
  viewStyle,
  renderTag,
  ...props
}: TagInputProps) => {
  return (
    <View style={[{ width: '95%', alignSelf: 'center' }, viewStyle]}>
      <Tags
        containerStyle={styles.container}
        initialText={initialText}
        textInputProps={{
          placeholder: 'Skills developed',
          placeholderTextColor: colors[Colors.tertiary9],
        }}
        inputStyle={styles.input}
        initialTags={initialTags}
        onChangeTags={onChangeTags}
        onTagPress={onTagPress}
        renderTag={renderTag}
        {...props}
      />
    </View>
  )
}

export default TagInput

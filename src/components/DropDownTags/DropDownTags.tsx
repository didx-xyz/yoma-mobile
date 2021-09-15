import { FormikProps } from 'formik'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { Colors } from 'styles'
import { dropElement, textOrSpace } from 'utils/strings.utils'

import Tag from '../Tag'
import Text, { FontWeights, MetaLevels, TextAlign } from '../Typography'
import styles from './DropDownTags.styles'

type Props = Omit<
  React.ComponentProps<typeof DropDownPicker>,
  'open' | 'setOpen' | 'setValue' | 'setItems' | 'value'
> & {
  name: string
  label: string
  handlers: FormikProps<any>
}

const renderTags = (tags: string[], onDelete: (tag: string) => void) =>
  tags.map((tag, index) => <Tag key={index} tag={tag} onDeleteTag={onDelete} />)

const DropDownTags = ({ name, label, handlers, ...props }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [dropDownValue, setDropdownValue] = useState([])
  const { handleChange, handleBlur, errors, values, touched, setFieldValue } = handlers
  const { t } = useTranslation()

  const removeTag = (tag: string) => setDropdownValue(dropElement(tag, dropDownValue))

  useEffect(() => {
    if (values[name]) {
      setDropdownValue(values[name])
    }
  }, [name, values])

  return (
    <>
      <Text.Meta level={MetaLevels.Small}>{textOrSpace(dropDownValue.length > 0, label)}</Text.Meta>
      <DropDownPicker
        style={styles.dropDown}
        dropDownContainerStyle={styles.dropDownView}
        placeholder={label}
        placeholderStyle={styles.placeholder}
        textStyle={styles.label}
        searchTextInputStyle={styles.search}
        searchContainerStyle={styles.searchContainer}
        listMode={'MODAL'}
        onChangeValue={itemValue => {
          if (values[name] !== itemValue) {
            handleChange(name)
            handleBlur(name)
            setFieldValue(name, itemValue)
          }
        }}
        value={dropDownValue}
        open={isOpen}
        setOpen={setIsOpen}
        setValue={setDropdownValue}
        showArrowIcon={false}
        CloseIconComponent={() => (
          <Text.Body align={TextAlign.Center} weight={FontWeights.Bold700} color={Colors.PrimaryGreen}>
            {t('Done')}
          </Text.Body>
        )}
        closeIconContainerStyle={styles.save}
        {...props}
      />
      <View style={styles.tagsContainer}>{renderTags(dropDownValue, removeTag)}</View>
      <View style={styles.divider} />
      <Text.Meta color={Colors.PrimaryRed} align={TextAlign.Right}>
        {errors[name] && touched[name] ? errors[name] : ' '}
      </Text.Meta>
    </>
  )
}

export default DropDownTags

import { FormikProps, FormikValues } from 'formik'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { Colors } from 'styles'
import { GetComponentProps } from 'types/react.types'
import { dropElement, textOrSpace } from 'utils/strings.utils'

import Tag from '../Tag'
import Text, { FontWeights, MetaLevels, TextAlign } from '../Typography'
import styles from './DropDownTags.styles'

type Props = Omit<GetComponentProps<typeof DropDownPicker>, 'open' | 'setOpen' | 'setValue' | 'setItems' | 'value'> & {
  name: string
  label: string
  handlers: FormikProps<FormikValues>
}

const renderTags = (tags: string[], onDelete: (tag: string) => void) =>
  tags.map((tag, index) => <Tag key={index} tag={tag} onDeleteSkill={onDelete} />)

const DropDownTags = ({ name, label, handlers, ...props }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [dropDownValue, setDropdownValue] = useState([])
  const { handleChange, handleBlur, errors, values, touched, setFieldValue } = handlers
  const { t } = useTranslation()

  const deleteSkill = (tag: string) => setDropdownValue(dropElement(tag, dropDownValue))

  return (
    <>
      <Text.Meta level={MetaLevels.small}>{textOrSpace(dropDownValue.length > 0, label)}</Text.Meta>
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
          <Text.Body align={TextAlign.center} weight={FontWeights.bold_700} color={Colors.primaryGreen}>
            {t('Done')}
          </Text.Body>
        )}
        closeIconContainerStyle={styles.save}
        {...props}
      />
      <View style={styles.tagsContainer}>{renderTags(dropDownValue, deleteSkill)}</View>
      <View style={styles.divider} />
      <Text.Meta color={Colors.primaryRed} align={TextAlign.right}>
        {errors[name] && touched[name] ? errors[name] : ' '}
      </Text.Meta>
    </>
  )
}

export default DropDownTags

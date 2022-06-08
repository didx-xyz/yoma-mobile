import { useField } from 'formik'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity, View } from 'react-native'
import DocumentPicker from 'react-native-document-picker'

import Text, { MetaLevels } from '../Typography'
import styles from './Upload.styles'

type Props = {
  label: string
  name: string
}

const Upload = ({ label, name }: Props) => {
  const { t } = useTranslation()
  const [, { value }, { setValue }] = useField(name)
  const [fileName, setFileName] = useState<string>(value)

  const handlePress = useCallback(async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      })
      setFileName(res[0].name)
      setValue(res[0])
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err
      }
    }
  }, [setValue])

  return (
    <View>
      <Text.Meta level={MetaLevels.Small}>{label}</Text.Meta>
      <View style={styles.inner}>
        <Text.Body>{fileName ? fileName : t('Upload')}</Text.Body>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text.Body>{t('Choose file')}</Text.Body>
        </TouchableOpacity>
      </View>
      <Text.Meta>{t('.pdfs supported')}</Text.Meta>
    </View>
  )
}

export default Upload

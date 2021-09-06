import React from 'react'
import { View } from 'react-native'

import { Colors } from '../../../styles'
import Avatar from '../../Avatar'
import IconButtonEdit from '../../IconButtonEdit'
import Text, { BodyLevels, HeaderLevels } from '../../Typography'
import styles from './CvViewCredentialHeader.styles'

interface Props {
  title: string
  metadata?: string[]
  iconUrl: string
  isValidated: boolean
  onEdit: () => void
}

const CvViewCredentialHeader = ({ iconUrl, metadata = [], title, isValidated, onEdit }: Props) => {
  return (
    <View style={styles.container}>
      <Avatar name={title} url={iconUrl} isValidated={isValidated} />
      <View style={styles.content}>
        <Text.Header level={HeaderLevels.H6} color={Colors.PrimaryDarkGrey}>
          {title}
        </Text.Header>
        {metadata.map(text => (
          <Text.Body level={BodyLevels.Small} color={Colors.MenuGrey}>
            {text}
          </Text.Body>
        ))}
      </View>
      <IconButtonEdit onPress={onEdit} />
    </View>
  )
}

export default CvViewCredentialHeader

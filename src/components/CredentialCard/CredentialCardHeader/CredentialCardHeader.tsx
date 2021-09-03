import React from 'react'
import { View } from 'react-native'

import { Colors } from '../../../styles'
import Avatar from '../../Avatar'
import EditButton from '../../EditButton/EditButton'
import Text, { BodyLevels, HeaderLevels } from '../../Typography'
import styles from '../CredentialCard.styles'

interface Props {
  title: string
  subtitle?: string
  iconUrl: string
  isValidated: boolean
  onEdit: () => void
}

const CredentialCardHeader = ({ iconUrl, subtitle, title, isValidated, onEdit }: Props) => {
  return (
    <View style={styles.container}>
      <Avatar name={title} url={iconUrl} isValidated={isValidated} />
      <View>
        <Text.Header level={HeaderLevels.H6} color={Colors.PrimaryDarkGrey}>
          {title}
        </Text.Header>
        <Text.Body level={BodyLevels.Small} color={Colors.MenuGrey}>
          {subtitle}
        </Text.Body>
      </View>
      <EditButton onPress={onEdit} />
    </View>
  )
}

export default CredentialCardHeader

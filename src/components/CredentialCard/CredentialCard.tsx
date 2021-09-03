import React from 'react'
import { View } from 'react-native'

import Optional from '../Optional'
import Text from '../Typography'
import styles from './CredentialCard.styles'
import CredentialCardHeader from './CredentialCardHeader/CredentialCardHeader'

interface Props {
  title: string
  subtitle?: string
  description?: string
  iconUrl: string
  isValidated: boolean
  onEdit: () => void
}
const CredentialCard = ({ description, iconUrl, subtitle, title, isValidated, onEdit }: Props) => {
  return (
    <View style={styles.container}>
      <CredentialCardHeader
        title={title}
        subtitle={subtitle}
        iconUrl={iconUrl}
        isValidated={isValidated}
        onEdit={onEdit}
      />
      <Optional condition={description !== ''}>
        <Text.Body style={styles.description}>{description}</Text.Body>
      </Optional>
    </View>
  )
}

export default CredentialCard

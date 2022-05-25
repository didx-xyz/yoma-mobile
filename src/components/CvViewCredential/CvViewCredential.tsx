import React from 'react'
import { View } from 'react-native'

import Optional from '../Optional'
import Text from '../Typography'
import styles from './CvViewCredential.styles'
import CvViewCredentialHeader from './CvViewCredentialHeader'

interface Props extends React.ComponentProps<typeof CvViewCredentialHeader> {
  description?: string
}

const CvViewCredential = ({ description, iconUrl, metadata, title, isValidated, onEdit }: Props) => (
  <View style={styles.container}>
    <CvViewCredentialHeader
      title={title}
      metadata={metadata}
      iconUrl={iconUrl}
      isValidated={isValidated}
      onEdit={onEdit}
    />
    <Optional condition={description !== ''}>
      <Text.Body style={styles.description}>{description}</Text.Body>
    </Optional>
  </View>
)

export default CvViewCredential

import React from 'react'
import { View } from 'react-native'

import { Colors } from '~/styles'
import { FCWithChildren } from '~/types/react.types'
import { isNotNil } from '~/utils/ramda.utils'

import { IconButtonAdd, IconButtonEdit } from '../IconButton'
import Optional from '../Optional'
import Text, { TextAlign } from '../Typography'
import styles from './CvWidget.styles'
import { shouldShowContent } from './CvWidget.utils'
import CredentialWidgetHeader from './Header'

interface Props extends FCWithChildren {
  title: string
  noDataMessage: string
  count?: number
  badgeColor?: Colors
  onActionPress: () => void
  isEditAction?: boolean
}
const CvWidget = ({
  title,
  noDataMessage,
  count,
  badgeColor = Colors.White,
  onActionPress,
  children,
  isEditAction = false,
}: Props) => (
  <View style={styles.container}>
    <CredentialWidgetHeader
      color={badgeColor}
      count={count}
      header={title}
      hasCountBadge={isNotNil(count) as boolean}
      actionItem={isEditAction ? <IconButtonEdit onPress={onActionPress} /> : <IconButtonAdd onPress={onActionPress} />}
      hasBorder
    />
    <View style={styles.content}>
      <Optional
        condition={shouldShowContent(count, children)}
        fallback={<Text.Body align={TextAlign.Center}>{noDataMessage}</Text.Body>}
      >
        {children}
      </Optional>
    </View>
  </View>
)

export default CvWidget

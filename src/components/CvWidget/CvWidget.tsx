import React from 'react'
import { View } from 'react-native'

import { IconButtonAdd, IconButtonEdit } from '~/components/IconButton'
import Optional from '~/components/Optional'
import Text, { TextAlign } from '~/components/Typography'
import { Colors } from '~/styles'
import { FCWithChildren } from '~/types/react.types'
import { isNotNil } from '~/utils/ramda.utils'

import styles from './CvWidget.styles'
import { shouldShowContent } from './CvWidget.utils'
import CredentialWidgetHeader from './Header'

interface Props extends FCWithChildren {
  title: string
  noDataMessage: string
  onActionPress: () => void
  hasContent?: boolean
  count?: number
  badgeColor?: Colors
  isEditAction?: boolean
}
const CvWidget = ({
  title,
  noDataMessage,
  hasContent,
  count,
  onActionPress,
  badgeColor = Colors.White,
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
        condition={shouldShowContent(count, hasContent, children)}
        fallback={<Text.Body align={TextAlign.Center}>{noDataMessage}</Text.Body>}
      >
        {children}
      </Optional>
    </View>
  </View>
)

export default CvWidget

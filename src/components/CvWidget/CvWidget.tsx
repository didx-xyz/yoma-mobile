import React from 'react'
import { View } from 'react-native'

import { Colors } from '../../styles'
import { WithChildren } from '../../types/react.types'
import { isNotNil } from '../../utils/ramda.utils'
import IconButtonEdit from '../IconButtonEdit'
import Optional from '../Optional'
import Text, { TextAlign } from '../Typography'
import styles from './CvWidget.styles'
import { shouldShowContent } from './CvWidget.utils'
import CredentialWidgetHeader from './Header'

type Props = WithChildren<{
  title: string
  fallback: string
  count?: number
  badgeColor?: Colors
  onEdit: () => void
}>
const CvWidget = ({ title, fallback, count, badgeColor = Colors.White, onEdit, children }: Props) => (
  <View style={styles.container}>
    <CredentialWidgetHeader
      color={badgeColor}
      count={count}
      header={title}
      hasCountBadge={isNotNil(count) as boolean}
      actionItem={<IconButtonEdit onPress={onEdit} />}
      hasBorder
    />
    <View style={styles.content}>
      <Optional
        condition={shouldShowContent(count, children)}
        fallback={<Text.Body align={TextAlign.Center}>{fallback}</Text.Body>}
      >
        {children}
      </Optional>
    </View>
  </View>
)

export default CvWidget

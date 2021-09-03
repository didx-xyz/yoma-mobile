import { EditIcon } from 'assets/images'
import { DATE_TPL_MON_YEAR } from 'constants/date.constants'
import { formatDistance } from 'date-fns'
import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { Colors } from 'styles'
import { getUppercasedHead } from 'utils/strings.utils'

import DateDisplay from '../DateDisplay'
import Optional from '../Optional'
import Text, { HeaderLevels } from '../Typography'
import styles from './InfoCard.styles'

type Props = {
  title: string
  subtitle?: string
  description: string
  startDate: string
  endDate: string
  logo: string
  onEdit?: () => void
}

const InfoCard = ({ description, startDate, endDate, logo, subtitle, title, onEdit }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Optional
          condition={!!logo}
          fallback={<Avatar size="small" rounded title={getUppercasedHead(title)} containerStyle={styles.avatar} />}
        >
          <Image source={{ uri: logo }} style={styles.image} />
        </Optional>
        <View>
          <Text.Header level={HeaderLevels.H6} color={Colors.PrimaryDarkGrey} style={styles.title}>
            <Optional condition={!!subtitle} fallback={<>{title}</>}>
              {subtitle + ' : ' + title}
            </Optional>
          </Text.Header>
          <View style={styles.row}>
            <DateDisplay template={DATE_TPL_MON_YEAR} date={startDate}>
              {' - '}
            </DateDisplay>
            <DateDisplay template={DATE_TPL_MON_YEAR} date={endDate}>
              {' • '}
              {formatDistance(new Date(endDate), new Date(startDate))}
            </DateDisplay>
          </View>
        </View>
        <TouchableOpacity style={styles.editIcon} onPress={onEdit}>
          <EditIcon />
        </TouchableOpacity>
      </View>
      <Optional condition={description !== ''}>
        <Text.Body style={styles.description}>{description}</Text.Body>
      </Optional>
    </View>
  )
}

export default InfoCard

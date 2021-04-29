import { EditIcon } from 'assets/images'
import { DATE_TPL_MON_YEAR } from 'constants/date.constants'
import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { Colors } from 'styles'
import { getUppercasedHead } from 'utils/strings.utils'

import Card from '../Card'
import DateDisplay from '../DateDisplay'
import Optional from '../Optional'
import Text, { HeaderLevels } from '../Typography'
import styles from './InfoCard.styles'

type Props = {
  title: string
  subtitle: string
  description: string
  endDate: string
  logo: string
  onEdit?: () => void
}

const InfoCard = ({ description, endDate, logo, subtitle, title, onEdit }: Props) => {
  return (
    <Card style={styles.cardView}>
      <View style={styles.row}>
        <Optional
          condition={logo !== ''}
          fallback={<Avatar size="small" rounded title={getUppercasedHead(title)} containerStyle={styles.avatar} />}
        >
          <Image source={{ uri: logo }} style={styles.image} />
        </Optional>
        <View>
          <Text.Header level={HeaderLevels.h6} color={Colors.primaryDarkGrey}>
            {subtitle + ' : ' + title}
          </Text.Header>
          <View style={styles.row}>
            <DateDisplay template={DATE_TPL_MON_YEAR} date={endDate} />
          </View>
        </View>
        <TouchableOpacity style={styles.editIcon} onPress={onEdit}>
          <EditIcon />
        </TouchableOpacity>
      </View>
      <Optional condition={description !== ''}>
        <Text.Body>{description}</Text.Body>
      </Optional>
    </Card>
  )
}

export default InfoCard

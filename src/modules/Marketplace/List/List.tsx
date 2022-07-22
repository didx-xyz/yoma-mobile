import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

import { ZIcon } from '~/assets/images'
import { Bold } from '~/components/Typography'
import { Colors } from '~/styles'

//import ViewContainer from '~/components/ViewContainer'
import styles from './List.styles'

type Props = {
  zltoBalance: number
}

const List = ({ zltoBalance }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={styles.OrganizationInfoContainer}>
          <View style={styles.imageViewContainer}>
            <Image
              style={styles.profileImage}
              source={{
                uri: 'https://png.pngtree.com/png-vector/20190303/ourlarge/pngtree-modern-abstract-3d-logo-png-image_771012.jpg ',
              }}
            />
          </View>
          <View style={styles.nameContainer}>
            <Text style={[styles.name]}>R10 Airtime</Text>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>For all major service providers</Text>
        </View>
        <TouchableOpacity style={styles.tokensView}>
          <ZIcon />
          <Text style={styles.tokenAmount}>
            <Bold color={Colors.PrimaryYellow}>{zltoBalance}</Bold>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default List

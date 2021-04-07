import NormalHeader from 'components/NormalHeader/NormalHeader'
import ProfilePhoto from 'components/ProfilePhoto/ProfilePhoto'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, Text, View } from 'react-native'
import { TextStyles } from 'styles'

import ViewContainer from '../../components/ViewContainer/ViewContainer'
import styles from './Profile.styles'
import ProfileForm from './ProfileForm/ProfileForm'

interface Props {
  navigation: any
}

const Profile = ({ navigation }: Props) => {
  const { t } = useTranslation()
  return (
    <ViewContainer style={styles.container}>
      <NormalHeader
        navigation={navigation}
        headerText={'Profile'}
      />
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <View style={styles.whiteCard}>
          <ProfilePhoto
            borderWidth={6}
            outerRadius={40}
            onPress={() => { }}
            percent={5}
            editIcon={true}
            profileOuterStyle={{
              marginTop: -50
            }}
          />
          <ProfileForm />
        </View>
        <Text style={[
          TextStyles.textTertiary9,
          TextStyles.semiBoldText,
          { marginVertical: 20 }]}
        >
          {t('Log Out')}
        </Text>
      </ScrollView>
    </ViewContainer>
  )
}

export default Profile

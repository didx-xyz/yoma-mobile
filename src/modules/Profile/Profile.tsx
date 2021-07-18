import { StackNavigationProp } from '@react-navigation/stack'
import { EditIcon } from 'assets/images'
import { Card, NormalHeader, Optional, ProfilePhoto, ViewContainer } from 'components'
import Button, { ButtonVariants } from 'components/Button'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from 'modules/HomeNavigation/HomeNavigation.types'
import { UserResponse } from 'modules/User/User.types'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'

import ProfileForm from './Profile.form'
import styles from './Profile.styles'
import { ProfileFormState } from './Profile.types'

interface Props {
  onLogoutUser: () => void
  onProfileSave: (photo: any) => void
  onPhotoSave: () => void
  user: UserResponse
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Profile>
}

const Profile = ({ navigation, onLogoutUser, onPhotoSave, onProfileSave, user }: Props) => {
  const [userResponse] = useState<UserResponse>(user)
  const [formState, setFormState] = useState<ProfileFormState | null>(null)

  const { t } = useTranslation()

  const handleProfileForm = () => {
    if (formState?.isValid) {
      onProfileSave(formState.values)
    }
  }

  return (
    <ViewContainer style={styles.container}>
      <NormalHeader isSaveButtonEnabled navigation={navigation} headerText={'Profile'} onSave={handleProfileForm} />
      <ScrollView>
        <Card style={styles.card}>
          <Optional
            condition={!!userResponse.photoURL}
            fallback={
              <ProfilePhoto
                borderWidth={6}
                outerRadius={40}
                onPress={onPhotoSave}
                percent={5}
                showEditIcon={true}
                profileOuterStyle={styles.imagePlaceholder}
              />
            }
          >
            <TouchableOpacity onPress={onPhotoSave} style={styles.imageContainer}>
              <Image source={{ uri: userResponse.photoURL as string }} style={styles.profileImage} />
              <View style={styles.editIcon}>
                <EditIcon />
              </View>
            </TouchableOpacity>
          </Optional>
          <ProfileForm setFormState={setFormState} user={userResponse} />
        </Card>
        <Button
          variant={ButtonVariants.Clear}
          color={Colors.menuGrey}
          label={t('Log Out')}
          onPress={onLogoutUser}
          style={styles.logout}
        />
      </ScrollView>
    </ViewContainer>
  )
}

export default Profile

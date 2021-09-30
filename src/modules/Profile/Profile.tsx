import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'

import { EditIcon } from '../../assets/images'
import Button, { ButtonSave, ButtonVariants } from '../../components/Button'
import Card from '../../components/Card'
import Header from '../../components/Header'
import Optional from '../../components/Optional'
import ProfilePhoto from '../../components/ProfilePhoto'
import ViewContainer from '../../components/ViewContainer'
import { Colors } from '../../styles'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../HomeNavigation/HomeNavigation.types'
import { UserResponse } from '../User/User.types'
import ProfileForm from './Profile.form'
import styles from './Profile.styles'
import { ProfileFormState } from './Profile.types'

interface Props {
  onLogoutUser: () => void
  onPhotoSave: () => void
  onProfileSave: (user: any) => void
  user: UserResponse
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Profile>
}

const Profile = ({ navigation, onLogoutUser, onPhotoSave, onProfileSave, user }: Props) => {
  const [userResponse, setUserResponse] = useState<UserResponse>(user)
  const [formState, setFormState] = useState<ProfileFormState | null>(null)

  const { t } = useTranslation()

  const handleProfileForm = () => {
    if (formState?.isValid) {
      onProfileSave(formState.values)
    }
  }

  useEffect(() => {
    setUserResponse(user)
  }, [user])

  return (
    <ViewContainer style={styles.container}>
      <Header
        navigation={navigation}
        headerText={t('Profile')}
        actionItem={<ButtonSave onPress={handleProfileForm} isDisabled={!formState?.isValid} />}
      />
      <ScrollView>
        <Card style={styles.card}>
          <Optional
            condition={!!userResponse.photoURL}
            fallback={
              <ProfilePhoto
                size={78}
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
          color={Colors.MenuGrey}
          label={t('Log Out')}
          onPress={onLogoutUser}
          style={styles.logout}
        />
      </ScrollView>
    </ViewContainer>
  )
}

export default Profile

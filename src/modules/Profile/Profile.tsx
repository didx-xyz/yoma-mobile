import { StackNavigationProp } from '@react-navigation/stack'
import { EditIcon } from 'assets/images'
import { Card, NormalHeader, Optional, ProfilePhoto, ViewContainer } from 'components'
import Button, { ButtonVariants } from 'components/Button'
import { FormikProps, FormikValues } from 'formik'
import { UserResponse } from 'modules/Auth/Auth.types'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from 'modules/HomeNavigation/HomeNavigation.types'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'

import ProfileForm from './Profile.form'
import styles from './Profile.styles'

interface Props {
  onLogoutUser: () => void
  onPatchUserData: (user: any) => void
  user: any
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Profile>
}

const Profile = ({ navigation, onLogoutUser, onPatchUserData, user }: Props) => {
  const [userData] = useState<UserResponse>(user)
  const { t } = useTranslation()
  const childRef = useRef<FormikProps<FormikValues>>(null)

  return (
    <ViewContainer style={styles.container}>
      <NormalHeader
        isSaveButtonEnabled
        navigation={navigation}
        headerText={'Profile'}
        onSave={childRef.current?.handleSubmit}
      />
      <ScrollView>
        <Card style={styles.card}>
          <Optional
            condition={!!userData.photoURL}
            fallback={
              <ProfilePhoto
                borderWidth={6}
                outerRadius={40}
                onPress={() => {}}
                percent={5}
                showEditIcon={true}
                profileOuterStyle={styles.imagePlaceholder}
              />
            }
          >
            <TouchableOpacity onPress={() => {}} style={styles.imageContainer}>
              <Image source={{ uri: userData.photoURL as string }} style={styles.profileImage} />
              <View style={styles.editIcon}>
                <EditIcon />
              </View>
            </TouchableOpacity>
          </Optional>

          <ProfileForm onPatchUserData={onPatchUserData} ref={childRef} navigation={navigation} user={userData} />
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

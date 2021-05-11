import { StackNavigationProp } from '@react-navigation/stack'
import { EditIcon } from 'assets/images'
import { Card, NormalHeader, Optional, ProfilePhoto, ViewContainer } from 'components'
import Button, { ButtonVariants } from 'components/Button'
import { FormikProps, FormikValues } from 'formik'
import { UserResponse } from 'modules/Auth/Auth.types'
import { NavigationRoutes } from 'modules/Home/Home.routes'
import { HomeNavigatorParamsList } from 'modules/Home/Home.types'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'

import { USER_RESPONSE } from './Profile.constants'
import styles from './Profile.styles'
import { captureImage, getUserData } from './Profile.utils'
import ProfileForm from './ProfileForm/ProfileForm'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, NavigationRoutes.Profile>
}

const Profile = ({ navigation }: Props) => {
  const [userResponse, setUserResponse] = useState<UserResponse>(USER_RESPONSE)
  const { t } = useTranslation()
  const childRef = useRef<FormikProps<FormikValues>>()

  useEffect(() => {
    getData()
  }, [])

  const getData = useCallback(async () => {
    const user = await getUserData()
    setUserResponse(user)
  }, [])

  const uploadImage = async () => {
    const response = await captureImage()
    setUserResponse(response.data)
  }

  return (
    <ViewContainer style={styles.container}>
      <NormalHeader navigation={navigation} headerText={'Profile'} onSave={childRef.current?.handleSubmit} />
      <ScrollView>
        <Card style={styles.card}>
          <Optional
            condition={!!userResponse.photoURL}
            fallback={
              <ProfilePhoto
                borderWidth={6}
                outerRadius={40}
                onPress={uploadImage}
                percent={5}
                showEditIcon={true}
                profileOuterStyle={styles.imagePlaceholder}
              />
            }
          >
            <TouchableOpacity onPress={uploadImage} style={styles.imageContainer}>
              <Image source={{ uri: userResponse.photoURL }} style={styles.profileImage} />
              <View style={styles.editIcon}>
                <EditIcon />
              </View>
            </TouchableOpacity>
          </Optional>
          <ProfileForm ref={childRef} navigation={navigation} />
        </Card>
        <Button
          variant={ButtonVariants.Clear}
          color={Colors.menuGrey}
          label={t('Log Out')}
          // TODO: navigation to login page
          onPress={() => {}}
          style={styles.logout}
        />
      </ScrollView>
    </ViewContainer>
  )
}

export default Profile

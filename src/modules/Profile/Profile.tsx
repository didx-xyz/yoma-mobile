import { StackNavigationProp } from '@react-navigation/stack'
import { EditIcon } from 'assets/images'
import { Card, NormalHeader, Optional, ProfilePhoto, ViewContainer } from 'components'
import Button, { ButtonVariants } from 'components/Button'
import { FormikProps, FormikValues } from 'formik'
import { UserResponse } from 'modules/Auth/Auth.types'
import { HomeNavigationRoutes } from 'modules/HomeNavigation/HomeNavigation.routes'
import { HomeNavigatorParamsList } from 'modules/HomeNavigation/HomeNavigation.types'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'

import { USER_RESPONSE } from './Profile.constants'
import ProfileForm from './Profile.form'
import styles from './Profile.styles'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Profile>
}

const Profile = ({ navigation }: Props) => {
  const [userResponse] = useState<UserResponse>(USER_RESPONSE)
  const { t } = useTranslation()
  const childRef = useRef<FormikProps<FormikValues>>()

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
                onPress={() => {}}
                percent={5}
                showEditIcon={true}
                profileOuterStyle={styles.imagePlaceholder}
              />
            }
          >
            <TouchableOpacity onPress={() => {}} style={styles.imageContainer}>
              <Image source={{ uri: userResponse.photoURL as string }} style={styles.profileImage} />
              <View style={styles.editIcon}>
                <EditIcon />
              </View>
            </TouchableOpacity>
          </Optional>
          <ProfileForm ref={childRef} navigation={navigation} user={userResponse} />
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

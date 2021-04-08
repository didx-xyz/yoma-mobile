import NormalHeader from 'components/NormalHeader/NormalHeader'
import React from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { TextStyles } from 'styles'

import ViewContainer from '../../components/ViewContainer/ViewContainer'
import styles from './About.styles'

interface Props {
  navigation: any
}

const About = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const [aboutText, setAboutText] = useState('')
  return (
    <ViewContainer style={styles.container}>
      <NormalHeader
        navigation={navigation}
        headerText={t('About')}
        onSave={() => { }}
      />
      <View style={styles.whiteCard}>
        <Text style={{ alignSelf: 'flex-start' }}>{t('Summary')}</Text>
        <TextInput
          style={styles.textInputStyle}
          value={aboutText}
          multiline
          maxLength={1000}
          onChangeText={(text) => {
            setAboutText(text)
          }}
          returnKeyType='done'
        />
        <TouchableOpacity onPress={() => { }}>
          <Text style={[TextStyles.h5, TextStyles.textTertiary3, { marginVertical: 10 }]}>
            {t('Find inspiration on how to write a great profile.')}
          </Text>
        </TouchableOpacity>
      </View>
    </ViewContainer>
  )
}

export default About

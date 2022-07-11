import { FormikProps } from 'formik'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { ButtonSave } from '~/components/Button'
import Card from '~/components/Card'
import FormLayout from '~/components/FormLayout'
import Header from '~/components/Header'
import InfoModal from '~/components/InfoModal'
import Input from '~/components/Input'
import Text, { MetaLevels } from '~/components/Typography'
import ViewContainer from '~/components/ViewContainer'
import { AboutNavigation } from '~/modules/About/types'
import { Colors } from '~/styles'

import styles from './AboutForm.styles'

interface Props {
  navigation: AboutNavigation
  form: FormikProps<any>
}

const AboutForm = ({ navigation, form }: Props) => {
  const { t } = useTranslation()
  const [infoModal, setInfoModal] = useState(false)

  return (
    <ViewContainer style={styles.container}>
      <InfoModal
        visible={infoModal}
        closeModal={() => setInfoModal(false)}
        infoText={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis mauris purus. Quisque malesuada ornare mauris sed feugiat. Cras lectus est, iaculis quis nulla cursus, finibus gravida massa. Donec condimentum porta nisi, eu egestas risus ullamcorper in. In et magna mauris. '
        }
      />
      <Header
        navigation={navigation}
        headerText={t('about.title')}
        actionItem={<ButtonSave onPress={form.handleSubmit} />}
      />
      <ScrollView>
        <Card style={styles.card}>
          <FormLayout>
            <Input name={'biography'} label={t('Summary')} multiline maxLength={1000} returnKeyType="done" />
            <View style={styles.bottom}>
              <Text.Meta level={MetaLevels.SmallBold} color={Colors.PrimaryGreen} onPress={() => setInfoModal(true)}>
                {t('Find inspiration on how to write a great education description.')}
              </Text.Meta>
            </View>
          </FormLayout>
        </Card>
      </ScrollView>
    </ViewContainer>
  )
}

export default AboutForm

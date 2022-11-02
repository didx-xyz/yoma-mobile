import { FormikProps } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native-gesture-handler'

import { ButtonSave } from '~/components/Button'
import Card from '~/components/Card'
import FormLayout from '~/components/FormLayout'
import Header from '~/components/Header'
import Input from '~/components/Input'
import ViewContainer from '~/components/ViewContainer'
import { AboutNavigation } from '~/modules/About/types'

import styles from './AboutForm.styles'

interface Props {
  navigation: AboutNavigation
  form: FormikProps<any>
}

const AboutForm = ({ navigation, form }: Props) => {
  const { t } = useTranslation()

  return (
    <ViewContainer style={styles.container}>
      <Header
        navigation={navigation}
        headerText={t('about.title')}
        actionItem={<ButtonSave onPress={form.handleSubmit} />}
      />
      <ScrollView>
        <Card style={styles.card}>
          <FormLayout>
            <Input name={'biography'} label={t('Summary')} multiline maxLength={1000} returnKeyType="done" />
          </FormLayout>
        </Card>
      </ScrollView>
    </ViewContainer>
  )
}

export default AboutForm

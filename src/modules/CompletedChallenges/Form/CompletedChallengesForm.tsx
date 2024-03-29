import { FormikProps } from 'formik'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { IconInfo } from '~/assets/images'
import { ButtonSave } from '~/components/Button'
import CheckBoxInput from '~/components/CheckBoxInput'
import DateRangeSelect from '~/components/DateRangeSelect'
import DropDown from '~/components/DropDown'
import { DropDownItem } from '~/components/DropDown/DropDown.types'
import FormGroup from '~/components/FormGroup'
import Header from '~/components/Header'
import Optional from '~/components/Optional'
import Upload from '~/components/Upload'
import ViewContainer from '~/components/ViewContainer'
import { types as ChallengeTypes } from '~/modules/Challenges'

import ChallengeInfo from './ChallengeInfo'
import styles from './CompletedChallengesForm.styles'
import { CompletedChallengesNavigation, FormFields } from './CompletedChallengesForm.types'

interface Props {
  challenges: ChallengeTypes.NormalisedChallenges
  challengesDropDown: DropDownItem[]
  form: FormikProps<FormFields>
  navigation: CompletedChallengesNavigation
}

const CompletedChallengesForm = ({ navigation, challenges, challengesDropDown, form }: Props) => {
  const { t } = useTranslation()
  const [hasSelectedChallenge, setHasSelectedChallenge] = useState(false)

  useEffect(() => {
    setHasSelectedChallenge(form.values.credentialItemId !== '')
  }, [form.values.credentialItemId])

  return (
    <ViewContainer style={styles.container}>
      <Header
        navigation={navigation}
        headerText={t('Add challenge')}
        actionItem={<ButtonSave onPress={form.handleSubmit} />}
      />
      <ScrollView>
        <FormGroup>
          <DropDown name="credentialItemId" label={t('Select a challenge')} items={challengesDropDown} />
          <Optional condition={hasSelectedChallenge}>
            <DateRangeSelect label={t('When did you do the challenge?')} />
            <Upload name="certificate" label={t('Upload certification (if completed)')} />
            <View style={styles.checkBoxRow}>
              <CheckBoxInput label={t('Request verification')} name="requestVerification" />
              <View style={styles.iconInfo}>
                <IconInfo />
              </View>
            </View>
          </Optional>
        </FormGroup>
        <Optional condition={hasSelectedChallenge}>
          <ChallengeInfo challenge={challenges.entities[form.values.credentialItemId]} />
        </Optional>
      </ScrollView>
    </ViewContainer>
  )
}

export default CompletedChallengesForm

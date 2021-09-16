import { StackNavigationProp } from '@react-navigation/stack'
import { FormikProps } from 'formik'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { IconInfo } from '../../../assets/images'
import CheckBoxInput from '../../../components/CheckBoxInput'
import DateRangeSelect from '../../../components/DateRangeSelect'
import DropDown from '../../../components/DropDown'
import { DropDownItem } from '../../../components/DropDown/DropDown.types'
import FormGroup from '../../../components/FormGroup'
import Header from '../../../components/Header'
import Optional from '../../../components/Optional'
import Upload from '../../../components/Upload'
import ViewContainer from '../../../components/ViewContainer'
import { types as ChallengeTypes } from '../../Challenges'
import { types as HomeNavigationTypes } from '../../HomeNavigation'
import ChallengeInfo from './ChallengeInfo'
import styles from './CompletedChallengesForm.styles'

interface Props {
  challenges: ChallengeTypes.NormalisedChallenges
  challengesDropDown: DropDownItem[]
  handlers: FormikProps<any>
  navigation: StackNavigationProp<
    HomeNavigationTypes.HomeNavigatorParamsList,
    HomeNavigationTypes.HomeNavigationRoutes.CompletedChallenges
  >
}

const CompletedChallengesForm = ({ navigation, challenges, challengesDropDown, handlers }: Props) => {
  const { t } = useTranslation()
  const [hasSelectedChallenge, setHasSelectedChallenge] = useState(false)

  useEffect(() => {
    if (handlers.values.challengeId !== '' && !hasSelectedChallenge) {
      setHasSelectedChallenge(true)
    }
  }, [handlers, hasSelectedChallenge])

  return (
    <ViewContainer style={styles.container}>
      <Header
        navigation={navigation}
        onSave={handlers.handleSubmit}
        headerText={t('Add challenge')}
        isSaveButtonEnabled
      />
      <ScrollView>
        <FormGroup>
          <DropDown name="challengeId" label={t('Select a challenge')} items={challengesDropDown} handlers={handlers} />
          <Optional condition={hasSelectedChallenge}>
            <DateRangeSelect label={t('When did you do the challenge?')} handlers={handlers} />
            <Upload onPress={() => {}} />
            <View style={styles.checkBoxRow}>
              <CheckBoxInput label={t('Request verification')} name="requestVerification" handlers={handlers} />
              <View style={styles.iconInfo}>
                <IconInfo />
              </View>
            </View>
          </Optional>
        </FormGroup>
        <Optional condition={hasSelectedChallenge}>
          <ChallengeInfo challenge={challenges.entities[handlers.values.challengeId]} />
        </Optional>
      </ScrollView>
    </ViewContainer>
  )
}

export default CompletedChallengesForm

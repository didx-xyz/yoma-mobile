import React from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity, View } from 'react-native'

import Text, { BodyLevels, HeaderLevels } from '../Typography'
import styles from './SkillCard.styles'

type Props = {
  skill: string
  skillCount: number
  onPress: () => void
}

const SkillCard = ({ skill, skillCount, onPress }: Props) => {
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <Text.Header level={HeaderLevels.h6}>
        {skill}
        <Text.Body level={BodyLevels.small}> • {skillCount}</Text.Body>
      </Text.Header>
      <TouchableOpacity onPress={onPress}>
        <Text.Header level={HeaderLevels.h6}>{t('Skills acquired')}</Text.Header>
      </TouchableOpacity>
    </View>
  )
}

export default SkillCard

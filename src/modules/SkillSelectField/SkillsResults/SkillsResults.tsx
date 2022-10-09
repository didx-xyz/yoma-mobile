import { FlashList, ListRenderItemInfo } from '@shopify/flash-list'
import React, { useCallback, useEffect, useState } from 'react'

import Divider from '~/components/Divider'
import SkillItem from '~/modules/SkillSelectField/SkillItem'
import NoSkillsStates from '~/modules/SkillSelectField/SkillsResults/NoSkillsStates'

interface Props {
  skills: string[]
  onItemSelect: (skill: string) => void
  hasNoResults: boolean
}

const SkillsResults = ({ skills, hasNoResults, onItemSelect }: Props) => {
  const [data, setData] = useState(skills)

  useEffect(() => {
    setData(skills)
  }, [skills])

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<string>) => <SkillItem key={item} item={item} onPress={onItemSelect} />,
    [onItemSelect],
  )

  const getDivider = useCallback(() => <Divider />, [])

  return (
    <FlashList
      ItemSeparatorComponent={getDivider}
      data={data}
      ListEmptyComponent={<NoSkillsStates hasNoResult={hasNoResults} />}
      renderItem={renderItem}
    />
  )
}

export default SkillsResults

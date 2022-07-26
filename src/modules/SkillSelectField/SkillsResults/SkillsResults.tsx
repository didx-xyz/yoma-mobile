import React, { useCallback, useEffect, useState } from 'react'
import { ListRenderItemInfo } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import Divider from '~/components/Divider'
import SkillItem from '~/modules/SkillSelectField/SkillItem'
import NoSkillsStates from '~/modules/SkillSelectField/SkillsResults/NoSkillsStates'
import { MaybeNil } from '~/types/general.types'

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

  const getItemLayout = useCallback(
    (_d: MaybeNil<string[]>, index: number) => ({ length: 25, offset: 25 * index, index }),
    [],
  )

  const getDivider = useCallback(() => <Divider />, [])

  return (
    <FlatList
      windowSize={11}
      initialNumToRender={20}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
      getItemLayout={getItemLayout}
      ItemSeparatorComponent={getDivider}
      data={data}
      ListEmptyComponent={<NoSkillsStates hasNoResult={hasNoResults} />}
      renderItem={renderItem}
    />
  )
}

export default SkillsResults

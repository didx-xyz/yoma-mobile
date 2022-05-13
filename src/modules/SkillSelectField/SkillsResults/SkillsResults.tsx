import React, { useCallback, useEffect, useState } from 'react'
import { FlatList } from 'react-native'

import Divider from '~/components/Divider'
import SkillItem from '~/modules/SkillSelectField/SkillItem'
import NoSkillsStates from '~/modules/SkillSelectField/SkillsResults/NoSkillsStates'

interface Props {
  skills: string[]
  onItemSelect: (skill: string) => void
  hasNoResults: boolean
  isLoading: boolean
}

const SkillsResults = ({ skills, hasNoResults, onItemSelect, isLoading = false }: Props) => {
  const [data, setData] = useState(skills)

  useEffect(() => {
    if (isLoading) {
      setData([])
    } else {
      setData(skills)
    }
  }, [isLoading, skills])

  const renderItem = useCallback(
    ({ item }) => <SkillItem key={item} item={item} onPress={onItemSelect} />,
    [onItemSelect],
  )
  const getItemLayout = useCallback((data, index) => ({ length: 25, offset: 25 * index, index }), [])

  return (
    <FlatList
      windowSize={11}
      initialNumToRender={20}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
      getItemLayout={getItemLayout}
      ItemSeparatorComponent={() => <Divider />}
      data={data}
      ListEmptyComponent={<NoSkillsStates isLoading={isLoading} hasNoResult={hasNoResults} />}
      renderItem={renderItem}
    />
  )
}

export default SkillsResults

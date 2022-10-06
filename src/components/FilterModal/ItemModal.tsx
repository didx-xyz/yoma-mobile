/* eslint-disable react-hooks/exhaustive-deps */
import { mergeRight } from 'ramda'
import React, { useEffect, useState } from 'react'
import { FlatList, Modal as RNModal, Text, TouchableOpacity, View } from 'react-native'

import { apiConfig } from '~/api'
import { ArrowBack } from '~/assets/images'
import Tick from '~/assets/images/GreenTick.svg'
import { FilterData, FilterItem, FilterItems } from '~/modules/Courses/Courses.types'
import { WithChildren } from '~/types/react.types'

import { constants as ApiStatsConstants } from '../../api/stats'
import ListFilter from '../ListFilter'
import Optional from '../Optional'
import styles from './FilterModal.style'

type Props = WithChildren<{
  setVisible: (state: boolean) => void
  isVisible: boolean
  title: String
  isApply?: boolean
  filterData: FilterData
  setFilterData: Function
  data?: FilterItems | null
}>

const ItemModal = ({ setVisible, isVisible, filterData, setFilterData, title = 'Filter', data }: Props) => {
  const [filterItems, setFilterItems] = useState<FilterItems | null | undefined>(null)
  const [isApply, setIsApply] = useState(false)
  const [tickedItem, setTickedItem] = useState<String>('')
  const selectFilter = (name: String) => {
    let tempData: FilterItems = []
    filterItems?.forEach(element => {
      if (element.label === name) {
        tempData.push({ ...element, ticked: !element.ticked })
        setTickedItem(element.label)
      } else {
        tempData.push({ ...element, ticked: false })
      }
    })
    setFilterItems(tempData)
  }
  const isItemsChecked = () => {
    let count = 0
    filterItems &&
      filterItems?.forEach(item => {
        if (item.ticked === true) {
          count = count + 1
        }
      })
    if (count >= 1) {
      setIsApply(true)
    } else {
      setIsApply(false)
    }
  }
  const dataSetter = () => {
    if (title && filterData[title.toLowerCase()]) {
      let tempData: FilterItems = []
      for (let key in filterData) {
        if (key === title.toLowerCase()) {
          data?.forEach(element => {
            if (element?.label === filterData[key]) {
              tempData.push({ ...element, ticked: true })
            } else {
              tempData.push({ ...element })
            }
          })
          // }
        }
      }
      setFilterItems(tempData)
    } else {
      setFilterItems(data)
    }
  }
  useEffect(() => {
    dataSetter()
  }, [data, title])
  useEffect(() => {
    isItemsChecked()
  }, [filterItems])

  return (
    <RNModal visible={isVisible} transparent animationType={'fade'} hardwareAccelerated statusBarTranslucent>
      <View style={styles.modalOverlay} />
      <View style={styles.modal}>
        <View style={styles.modalHeader}>
          <TouchableOpacity style={styles.button} onPress={() => setVisible(false)}>
            <ArrowBack />
            <Text style={styles.Text}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.modalHeaderTitle}>{title}</Text>
          <Optional condition={isApply} fallback={<View style={styles.emptyView} />}>
            <TouchableOpacity
              onPress={() => {
                setFilterData({ ...filterData, [title.toLowerCase()]: tickedItem })
                setVisible(false)
              }}
            >
              <Text style={styles.Text}>Apply</Text>
            </TouchableOpacity>
          </Optional>
        </View>

        {!(title === 'Skills') ? (
          <FlatList
            data={filterItems}
            keyExtractor={(item: FilterItem) => item.label}
            renderItem={({ item }) => (
              <>
                <TouchableOpacity
                  style={styles.filterItemContainer}
                  onPress={() => {
                    selectFilter(item.label)
                  }}
                >
                  <View style={styles.fitlerItem}>
                    <Text>{item?.value}</Text>
                    {item?.ticked && <Tick />}
                  </View>
                </TouchableOpacity>
              </>
            )}
          />
        ) : (
          <>
            <ListFilter
              searchPlaceholder={'search'}
              setSearchTerm={text => {
                apiConfig
                  .createApiClient(mergeRight(ApiStatsConstants.SKILLS_STATS_CONFIG, { params: { firstLetter: text } }))
                  .then(res => {
                    setFilterItems(res.data.data)
                  })
              }}
            />
            <FlatList
              data={filterItems}
              keyExtractor={(item: FilterItem) => item.label}
              renderItem={({ item }) => (
                <>
                  <TouchableOpacity
                    style={styles.filterItemContainer}
                    onPress={() => {
                      selectFilter(item?.label)
                    }}
                  >
                    <View style={styles.fitlerItem}>
                      <Text>{item?.value}</Text>
                      {item?.ticked && <Tick />}
                    </View>
                  </TouchableOpacity>
                </>
              )}
            />
          </>
        )}
      </View>
    </RNModal>
  )
}
export default ItemModal

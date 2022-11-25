import React, { useState } from 'react'
import { FlatList, Modal as RNModal, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'

import { apiConfig } from '~/api'
import { ArrowBack, ArrowPrev, Rectangle } from '~/assets/images'
import { FilterData, FilterItems } from '~/modules/Courses/Courses.types'
import { selectOrganisationsListTwo } from '~/modules/Organisations/Organisations.selector'
import { WithChildren } from '~/types/react.types'

import { constants as ApiStatsConstants } from '../../api/stats'
import Optional from '../Optional'
import { datepostedFilterOpportunity, typeFilterOpportunity } from './FilterModal.constants'
import styles from './FilterModal.style'
import { FilterModalData, FilterModalItem } from './FilterModal.type'
import ItemModal from './ItemModal'

type Props = WithChildren<{
  filterData: FilterData
  setFilterData: Function
  title: string
  setModalOpen: Function
  isModalOpen: boolean
}>

const FilterModal = ({ isModalOpen, setModalOpen, title = 'Filter', filterData, setFilterData }: Props) => {
  const [isVisible, setIsVisible] = useState(false)
  const [itemData, setItemData] = useState<FilterItems | null>(null)
  const [itemTitle, setItemTitle] = useState<String>('')
  const [count, setCount] = useState(1)
  const organisations = useSelector(selectOrganisationsListTwo)
  const [filterModalData] = useState<FilterModalData | null | undefined>([
    {
      text: 'Skills',
      id: 1,
    },
    {
      text: 'Type',
      id: 2,
    },
    {
      text: 'Language',
      id: 3,
    },
    {
      text: 'Countries',
      id: 4,
    },
    {
      text: 'Dateposted',
      id: 5,
    },
    {
      text: 'Organisationid',
      id: 6,
    },
  ])

  const handleCloseModal = () => {
    setModalOpen(false)
  }
  const handleMyStyle = (lateItem: string, letItem: string) => {
    console.log(lateItem, letItem, '==================')
    if (lateItem === letItem) {
      return styles.newFilterItem
    } else {
      return styles.fitlerItem
    }
  }

  const countFilter = (text: string) => {
    if (filterData[text.toLowerCase()]) {
      setCount(1)
      return true
    }
    return false
  }

  const handlePress = (item: FilterModalItem) => {
    if (item.text === 'Skills') {
      setItemData(null)
      setItemTitle(item?.text)
      setIsVisible(true)
    } else if (item.text === 'Language') {
      apiConfig.createApiClient(ApiStatsConstants.LANGUAGES_STATS_CONFIG).then(res => {
        setItemData(res.data.data)
        setItemTitle(item?.text)
        setIsVisible(true)
      })
    } else if (item.text === 'Countries') {
      apiConfig.createApiClient(ApiStatsConstants.COUNTRIES_STATS_CONFIG).then(res => {
        setItemData(res.data.data)
        setItemTitle(item?.text)
        setIsVisible(true)
      })
    } else if (item.text === 'Organisationid') {
      setItemData(organisations)
      setItemTitle(item?.text)
      setIsVisible(true)
    } else if (item.text === 'Type') {
      setItemData(typeFilterOpportunity)
      setItemTitle(item?.text)
      setIsVisible(true)
    } else {
      setItemData(datepostedFilterOpportunity)
      setItemTitle(item?.text)
      setIsVisible(true)
    }
  }

  return (
    <RNModal visible={isModalOpen} transparent animationType={'fade'} hardwareAccelerated statusBarTranslucent>
      <View style={styles.modalOverlay} />
      <View style={styles.modal}>
        <View style={styles.modalHeader}>
          <Optional
            condition={false}
            fallback={
              <TouchableOpacity onPress={handleCloseModal}>
                <Text style={styles.Text}>Close</Text>
              </TouchableOpacity>
            }
          >
            <TouchableOpacity style={styles.button}>
              <ArrowBack />
              <Text style={styles.Text}>Back</Text>
            </TouchableOpacity>
          </Optional>
          <Text style={styles.modalHeaderTitle}>{title}</Text>
          <Optional
            condition={true}
            fallback={
              <TouchableOpacity>
                <Text style={styles.Text} />
              </TouchableOpacity>
            }
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setFilterData({
                  skills: '',
                  type: '',
                  language: '',
                  countries: '',
                  dateposted: '',
                  organisationid: '',
                })
              }}
            >
              <Text style={styles.Text}>Reset</Text>
            </TouchableOpacity>
          </Optional>
        </View>

        <View style={{ backgroundColor: 'white', borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}>
          <FlatList
            data={filterModalData}
            keyExtractor={(item: FilterModalItem) => item.id.toString()}
            renderItem={({ item }) => (
              <View>
                {console.log(
                  filterModalData ? filterModalData[filterModalData?.length - 1]['text'] : null,
                  '========================',
                  item['text'],
                )}
                <TouchableOpacity style={styles.filterItemContainer} onPress={() => handlePress(item)}>
                  {filterModalData ? (
                    <View
                      style={handleMyStyle(
                        filterModalData && filterModalData[filterModalData?.length - 1]['text'],
                        item['text'],
                      )}
                    >
                      <Text style={styles.itemText}>{item.text}</Text>
                      <View style={styles.filterItemView}>
                        {countFilter(item.text) && (
                          <View style={styles.countView}>
                            <Rectangle />
                            <Text style={styles.countText}>{count}</Text>
                          </View>
                        )}
                        <ArrowPrev />
                      </View>
                    </View>
                  ) : null}
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <ItemModal
          isVisible={isVisible}
          setVisible={setIsVisible}
          data={itemData}
          filterData={filterData}
          setFilterData={setFilterData}
          title={itemTitle}
        />
      </View>
    </RNModal>
  )
}
export default FilterModal

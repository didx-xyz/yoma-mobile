import { useField } from 'formik'
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'

import InputError from '~/components/InputError'
import InputLabel from '~/components/InputLabel'
import Modal from '~/components/Modal'
import Optional from '~/components/Optional'
import Text, { HeaderLevels } from '~/components/Typography'
import { NormalisedCountries } from '~/modules/Countries/Countries.types'

import CountryItem from './CountryItem'
import CountrySelect from './CountrySelect'
import styles from './CountrySelectField.styles'

interface Props {
  name: string
  label?: string
  modalHeader?: string
  searchPlaceholder?: string
  countriesByCode: NormalisedCountries
}
const CountrySelectField = ({ name, label, modalHeader, searchPlaceholder, countriesByCode }: Props) => {
  const [, { value, error }, { setValue }] = useField(name)
  const [isModalOpen, setModalOpen] = useState<boolean>(false)

  const handleOnSelect = useCallback(
    (code?: string) => {
      console.log({ code })
      if (code) {
        setValue(code)
        setModalOpen(false)
      }
    },
    [setValue],
  )

  const handleOpenModal = useCallback(() => {
    setModalOpen(true)
  }, [])

  return (
    <>
      <View style={styles.container}>
        <Optional condition={!!label}>
          <InputLabel label={label} />
        </Optional>
        <CountryItem item={value} countries={countriesByCode.entities} onPress={handleOpenModal} />
        <InputError error={error} />
      </View>
      <Modal setVisible={setModalOpen} isVisible={isModalOpen} closeLabel="Cancel">
        <Optional condition={!!modalHeader || !!label}>
          <Text.Header level={HeaderLevels.H3} style={{ marginBottom: 8 }}>
            {modalHeader || label}
          </Text.Header>
        </Optional>
        <CountrySelect searchPlaceholder={searchPlaceholder} onItemSelect={handleOnSelect} />
      </Modal>
    </>
  )
}

export default CountrySelectField

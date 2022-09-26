import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

import { SearchIcon } from '~/assets/images'

import styles from './SearchBar.styles'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Searchbar({ value, updateSearch, backgroundColor, onSearch, onFocus }: any) {
  const [query, setQuery] = useState<any | null>(null)
  const [error, setError] = useState<any | null>(null)

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.viewSearch} onPress={() => onSearch(value)}>
          <SearchIcon style={styles.iconSearch} />
        </TouchableOpacity>
        <TextInput
          value={value}
          placeholder="Search"
          style={styles.textInput}
          onChangeText={text => {
            var letters = /^$|^[a-zA-Z._\b ]+$/
            if (text.length > 12) {
              setError('Query too long..')
            } else if (text.match(letters)) {
              setQuery(text)
              updateSearch(text)
            } else if (error) {
              setError(false)
            } else {
              setError('Please only enter alphabets')
            }
          }}
          onFocus={onFocus}
        />
        {query ? (
          <TouchableOpacity onPress={() => setQuery('')} style={styles.viewClear} />
        ) : (
          <View style={styles.viewClear} />
        )}
      </View>
      {error && <Text style={styles.textError}>{error}</Text>}
    </View>
  )
}

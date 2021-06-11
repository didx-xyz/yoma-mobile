import { cleanup, render } from '@testing-library/react-native'
import React from 'react'
import 'react-native'

import App from './App'

jest.mock('react-native-localize', () => ({
  findBestAvailableLanguage: (_x: any) => ({
    languageTag: null,
  }),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}))
jest.mock('@react-native-google-signin/google-signin', () => ({}))

jest.mock('rn-fetch-blob', () => ({}))

describe('App', () => {
  afterEach(cleanup)
  it('should render correctly', () => {
    const { toJSON } = render(<App />)
    const componentAsJSON = toJSON()

    expect(componentAsJSON).toMatchSnapshot()
  })
})

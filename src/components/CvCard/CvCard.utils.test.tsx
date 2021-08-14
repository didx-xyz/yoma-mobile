import React from 'react'
import { View } from 'react-native'

import * as SUT from './CvCard.utils'

describe('components/CvCard/CvCard.utils', function () {
  describe('shouldShowContent', function () {
    it.each([
      [<View />, 5, true],
      [<View />, undefined, true],
      [<View />, 0, false],
      [undefined, 5, false],
      [undefined, undefined, false],
      [undefined, 0, false],
    ])('should show the content under the correct circumstances', (children, count, expected) => {
      // given ...
      // when ...we want to show content
      const result = SUT.shouldShowContent(count, children)
      // then ... it should show the content or the fallback as expected
      expect(result).toBe(expected)
    })
  })
})

import React from 'react'
import { View } from 'react-native'

import * as SUT from './CvWidget.utils'

describe('components/CvWidget/CvWidget.utils', function () {
  describe('shouldShowContent', function () {
    it.each([
      [<View />, 5, undefined, true],
      [<View />, undefined, undefined, true],
      [<View />, 0, undefined, false],
      [undefined, 5, undefined, false],
      [undefined, undefined, undefined, false],
      [undefined, 0, undefined, false],
      [<View />, 5, false, false],
      [<View />, undefined, false, false],
      [undefined, undefined, true, true],
      [undefined, 0, true, true],
    ])('should show the content under the correct circumstances', (children, count, shouldOverride, expected) => {
      // given ...
      // when ...we want to show content
      const result = SUT.shouldShowContent(count, shouldOverride, children)
      // then ... it should show the content or the fallback as expected
      expect(result).toBe(expected)
    })
  })
})

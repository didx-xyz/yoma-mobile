import React from 'react'
import { View } from 'react-native'

import { Colors, colors } from '../../styles'
import { Optional } from '../index'

const Divider = ({ isVisible }: { isVisible: boolean }) => (
  <Optional condition={isVisible}>
    <View style={{ backgroundColor: colors[Colors.lightGrey], height: 1, width: '100%' }} />
  </Optional>
)

export default Divider

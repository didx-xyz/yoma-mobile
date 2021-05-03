import React from 'react'
import { View } from 'react-native'

interface Props {
  height: number
}

const Spacer = ({ height }: Props) => <View style={{ height }} />

export default Spacer

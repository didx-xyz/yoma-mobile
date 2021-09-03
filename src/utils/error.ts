import { MessageOptions, MessageType, showMessage } from 'react-native-flash-message'

export const showSimpleMessage = (
  type: MessageType = 'default',
  message: string = 'Message',
  description: string = '',
  props = {},
) => {
  const messageOptions: MessageOptions = {
    message: message,
    description: description,
    icon: { icon: 'auto', position: 'left' },
    type,
    duration: 2500,
    ...props,
  }

  showMessage(messageOptions)
}

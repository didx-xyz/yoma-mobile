import { Colors } from '../../styles'
import { ButtonVariants } from './Button.types'

export const mapVariantToLabelColor = {
  [ButtonVariants.Primary]: Colors.white,
  [ButtonVariants.Outline]: Colors.primaryGreen,
  [ButtonVariants.Clear]: Colors.primaryGreen,
}

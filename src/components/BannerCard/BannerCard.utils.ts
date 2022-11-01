import { OFFSET_FALLBACK } from './BannerCard.constants'
import { Offset } from './types'

export const safeOffset = (offset?: Offset) => (value: 'x' | 'y') => offset?.[value] || OFFSET_FALLBACK

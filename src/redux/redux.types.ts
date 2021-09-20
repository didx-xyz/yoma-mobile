import { StdObj } from '../types/general.types'
import rootReducer from './reducers'

export type RootState = ReturnType<typeof rootReducer>

export interface NormalisedData<T = any> {
  ids: string[]
  entities: StdObj<T>
}

import { StdObj } from '../types/general.types'
import rootReducer from './reducers'

export type RootState = ReturnType<typeof rootReducer>

export type NormalisedDataIds = string[]
export type NormalisedDataEntities<T = any> = StdObj<T>

export interface NormalisedData<T = any> {
  ids: NormalisedDataIds
  entities: NormalisedDataEntities<T>
}

export type Normalise<T> = (data: T[], identifier?: string) => NormalisedData<T>

export type NormaliseDependency<T> = { normalise: Normalise<T> }

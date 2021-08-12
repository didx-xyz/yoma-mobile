import rootReducer from './reducers'

export type RootState = ReturnType<typeof rootReducer>

export interface NormalisedData<T = any> {
  ids: string[]
  entities: Record<string, T>
}

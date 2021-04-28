import { AxiosRequestConfig, AxiosResponse } from 'axios'

export type GenerateEndpoint = (arr: string[]) => string
export type ApiClientFn = (body: Record<string, any>, config?: AxiosRequestConfig) => Promise<AxiosResponse>

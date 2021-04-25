import { AxiosRequestConfig, AxiosResponse } from 'axios'

export type ApiClientFn = (body: Record<string, any>, config?: AxiosRequestConfig) => Promise<AxiosResponse>

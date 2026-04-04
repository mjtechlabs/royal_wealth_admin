import axios, {AxiosRequestConfig} from 'axios'

import {PersistStorage, Store} from '@/store'

import CommonFunction from './CommonFunction'

let isFormDataType = false
let isAutoLogin = false
let isFormDataArray: string[] = []

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
})
apiInstance.interceptors.request.use((config) => {
  const temp = config

  let finalData = config.data
  if (!isFormDataType && !isAutoLogin) {
    finalData = {...finalData, token: Store?.getState()?.userData?.user?.token}
    config.data = {data: CommonFunction.encryptData(JSON.stringify(finalData))}
  }

  if (isFormDataType) {
    const token = Store.getState()?.userData?.user?.token

    const obj1: Record<string, any> = {}
    const obj2: Record<string, any> = {}

    Object.entries(finalData).forEach(([key, value]) => {
      if (isFormDataArray && isFormDataArray?.length > 0 && isFormDataArray?.includes(key)) {
        obj2[key] = value
      } else {
        obj1[key] = value
      }
    })

    let finalDataObject: Record<string, any> = {}

    if (obj1 && Object.keys(obj1).length > 0) {
      Object.entries(obj1).forEach(([key, value]) => {
        finalDataObject = {...finalDataObject, [key]: value}
      })
    }
    finalDataObject = {...finalData, token}
    let FormLoopObject: Record<string, any> = {
      data: CommonFunction.encryptData(JSON.stringify(finalDataObject))
    }

    if (obj2 && Object.keys(obj2).length > 0) {
      FormLoopObject = {...FormLoopObject, ...obj2}
    }

    const form = new FormData()
    Object.entries(FormLoopObject).forEach(([Key, value]) => {
      form.append(Key, value)
    })
    config.data = form
    isFormDataType = false
  }

  if (isAutoLogin) {
    isAutoLogin = false
  }
  return temp
})

apiInstance.interceptors.response.use(
  (res) => res,
  async (error) => Promise.reject(error)
)

const ApiCall = async (
  method: 'get' | 'post' | 'delete' | 'put',
  url: string,
  body?: any,
  params?: Record<string, any>,
  isFormData?: boolean,
  isAutoLoginType?: boolean,
  isFormaDataKeys?: string[]
) => {
  const config: AxiosRequestConfig = {}
  if (isFormData) {
    isFormDataType = true
  }
  if (isAutoLoginType) {
    isAutoLogin = true
  }
  if (method) {
    config.method = method
  }
  if (url) {
    config.url = url
  }
  if (body) {
    config.data = body
  }
  if (params) {
    config.params = params
  }
  if (isFormaDataKeys && isFormaDataKeys?.length > 0) {
    isFormDataArray = isFormaDataKeys
  }

  return new Promise((resolve, reject) => {
    isFormaDataKeys = []
    apiInstance(config)
      .then((response) => {
        const decrypt = CommonFunction.decryptData(response?.data)
        const res = JSON.parse(decrypt)
        if (res?.data?.status === 401) {
          PersistStorage.purge()
          CommonFunction.addSliceData('logout', {})
          return
        }
        resolve({
          data: res?.data?.response,
          status: res?.data?.status,
          result: res?.data?.result
        })
      })
      // eslint-disable-next-line consistent-return
      .catch((error) => {
        if (error?.status === 401) {
          const errorData = {
            ...error,
            status: 401,
            data: {
              message: error?.response?.data?.message
            }
          }
          PersistStorage.purge()
          CommonFunction.addSliceData('logout', {})

          // eslint-disable-next-line no-void
          return void reject(errorData)
        }
        if (
          error.status === 422 ||
          error?.response?.status === 422 ||
          error.status === 429 ||
          error?.response?.status === 429 ||
          error?.response?.status === 500 ||
          error?.response?.status === 504 ||
          error?.status === 500 ||
          error?.status === 404 ||
          error?.response?.status === 400 ||
          error?.status === 400 ||
          error?.response?.status === 502 ||
          error?.status === 502 ||
          error?.status === 405 ||
          error?.code === 'ERR_NETWORK' ||
          error?.code === 'ECONNABORTED'
        ) {
          const errorData = {
            ...error,
            status: 500,
            data: {
              message: 'Backend Team is Resolving the Issue, Stay Tuned....'
            }
          }
          // eslint-disable-next-line no-void
          return void reject(errorData ?? errorData?.response)
        }
      })
  })
}

export default ApiCall

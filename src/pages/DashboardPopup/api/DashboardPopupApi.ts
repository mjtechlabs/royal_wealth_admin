import {toast} from 'react-toastify'

import {ApiCall, EndPoints} from '@/services'
import {LoginApiData} from '@/types/apiTypes/AuthApiPayloadType'

const DashboardPopupUpload = async (props: {token: string; popupImage: string}) => {
  const payload = {
    pop_file: props?.popupImage
  }
  return new Promise<any>((resolve) => {
    ApiCall('post', EndPoints.uploadPopup, payload, {}, true, false, ['pop_file'])
      .then((res: any) => {
        if (res?.status === 200) {
          resolve(true)
          toast.success(res?.result)
        } else {
          toast.error(res?.result)
          resolve(null)
        }
      })
      .catch((e) => {
        toast.error(e?.data?.message)
        resolve(null)
      })
  })
}

const DashboardPopupDelete = async (props: Pick<LoginApiData, 'token'>) => {
  const payload = {
    token: props?.token
  }

  return new Promise<any>((resolve) => {
    ApiCall('post', EndPoints.deletePopup, payload)
      .then((res: any) => {
        if (res?.status === 200) {
          resolve(true)
          toast.success(res?.result)
        } else {
          toast.error(res?.result)
          resolve(null)
        }
      })
      .catch((e) => {
        toast.error(e?.data?.message)
        resolve(null)
      })
  })
}

const getDashboardPopup = async (props: Pick<LoginApiData, 'token'>) => {
  const payload = {
    token: props?.token
  }

  return new Promise<{data: {image_url: string}} | null>((resolve) => {
    ApiCall('post', EndPoints.getPopupImage, payload)
      .then((res: any) => {
        if (res?.status === 200) {
          resolve({
            data: res?.data
          })
        } else {
          toast.error(res?.result)
          resolve(null)
        }
      })
      .catch((e) => {
        toast.error(e?.data?.message)
        resolve(null)
      })
  })
}

const DashboardPopupApi = {DashboardPopupUpload, DashboardPopupDelete, getDashboardPopup}

export default DashboardPopupApi

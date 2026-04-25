import {toast} from 'react-toastify'

import ApiCall from '@/services/ApiCall'
import EndPoints from '@/services/EndPoints'
import {GiftListApiData, TopupApiProps} from '@/types/ApiTypes'

const GiftTopup = async (props: TopupApiProps) => {
  const payload = {
    amount: Number(props?.amount),
    usercode: props?.usercode
  }

  return new Promise<boolean>((resolve) => {
    ApiCall('post', EndPoints.stackTopup, payload)
      .then((res: any) => {
        if (res?.status === 200) {
          resolve(true)
          toast.success(res?.result)
        } else {
          resolve(false)
          toast.error(res?.result)
        }
      })
      .catch((e) => {
        toast.error(e?.result)
      })
  })
}

const GiftListReport = async () =>
  new Promise<{data: GiftListApiData[]} | null>((resolve) => {
    ApiCall('post', EndPoints.stackTopupReport)
      .then((res: any) => {
        if (res?.status === 200) {
          resolve({
            data: res?.data
          })
        } else {
          toast?.error(res?.result)
          resolve(null)
        }
      })
      .catch((e) => {
        toast.error(e?.result)
        resolve(null)
      })
  })

const StackTopupApi = {GiftTopup, GiftListReport}
export default StackTopupApi

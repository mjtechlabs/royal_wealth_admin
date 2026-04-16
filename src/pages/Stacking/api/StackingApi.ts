import {toast} from 'react-toastify'

import ApiCall from '@/services/ApiCall'
import EndPoints from '@/services/EndPoints'
import {TopUpApiData, TopupListApiProp} from '@/types/ApiTypes'

const StackingHistory = async (props: TopupListApiProp) => {
  const payload = {
    regsdate: props?.regsdate,
    regedate: props?.regedate,
    userwallet: props?.userwallet,
    usercode: props?.usercode
  }

  return new Promise<{data: TopUpApiData[]} | null>((resolve) => {
    ApiCall('post', EndPoints.stackingList, payload)
      .then((res: any) => {
        if (res?.status === 200) {
          resolve({
            data: res?.data?.orders_list
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
}

const StackingApi = {StackingHistory}
export default StackingApi

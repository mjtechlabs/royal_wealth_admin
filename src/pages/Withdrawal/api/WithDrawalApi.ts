import {toast} from 'react-toastify'

import ApiCall from '@/services/ApiCall'
import EndPoints from '@/services/EndPoints'
import {WithDrawApiData} from '@/types/ApiTypes'

const WithDrawData = async () =>
  new Promise<{data: WithDrawApiData[]} | null>((resolve) => {
    ApiCall('post', EndPoints.withdraw)
      .then((res: any) => {
        if (res?.status === 200) {
          resolve({
            data: res?.data?.withdrawal_request
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

const WithDrawalApi = {WithDrawData}
export default WithDrawalApi

import {toast} from 'react-toastify'

import ApiCall from '@/services/ApiCall'
import EndPoints from '@/services/EndPoints'

const GetAutopoolData = async (user_reg_code: string) =>
  new Promise<{data: any} | null>((resolve) => {
    ApiCall('post', EndPoints.getAutopoolData, {user_reg_code})
      .then((res: any) => {
        if (res?.status === 200) {
          resolve({
            data: res?.data
          })
        } else {
          toast?.error(res?.result ?? 'Failed to fetch autopool data')
          resolve(null)
        }
      })
      .catch((e) => {
        toast.error(e?.result ?? 'Error fetching data')
        resolve(null)
      })
  })

const AutopoolDetailsApi = {GetAutopoolData}
export default AutopoolDetailsApi

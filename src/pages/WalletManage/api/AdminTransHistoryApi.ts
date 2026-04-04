import {toast} from 'react-toastify'

import ApiCall from '@/services/ApiCall'
import EndPoints from '@/services/EndPoints'
import {AdminTransHistoryApiData} from '@/types/ApiTypes'

const AdminTransHistory = async () =>
  new Promise<{data: AdminTransHistoryApiData[]} | null>((resolve) => {
    ApiCall('post', EndPoints.adminWalletReport)
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

const AdminTransHistoryApi = {AdminTransHistory}
export default AdminTransHistoryApi
